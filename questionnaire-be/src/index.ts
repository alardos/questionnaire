import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import { Request, Response } from "express";
import { User } from "./model/user";
import * as jwt from "jsonwebtoken";
import { collections, connect } from "./services/user.service";
import { Md5 } from "ts-md5";
import { ObjectId } from "mongodb";
import { configDotenv } from "dotenv";
import { Form } from "./model/form";
import { Submit } from "./model/submit";

export default class Server {

  constructor(app: Application) {
    configDotenv();
    this.config(app);
  }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      origin: "http://localhost:4200"
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    const router = express.Router();
    router.post('/login',login);
    router.get('/testauth',testAuth);
    router.post('/signup',sigup);
    router.get('/form/all',getAllForm);
    router.post('/form/create',createForm);
    router.post('/form/delete',deleteForm);
    router.get('/form/read',readForm);
    router.get('/form/my-submits', getMySubmits);
    router.get('/form/my-forms', getMyForms);
    router.post('/form/submit',submitForm);
    router.get('/form/submit-details',getSubmitDetails);
    app.use(router);
    connect();
  }
}

async function submitForm(req:Request,res:Response): Promise<Response> {
    const user = await auth(req);
    if (!user) return res.status(403).json();
    console.log(user);
    const submit = Submit.from({
        answers:req.body.answers,
        submiterId:user._id!,
        formId: new ObjectId(String(req.body.formId)),
    });
    console.log(submit);
    const result = await collections.submits.insertOne(submit)
    return result.acknowledged ? res.json() : res.status(400).json();
}

async function createForm(req:Request, res:Response): Promise<Response> {
    const user = await auth(req);
    if (!user) return res.status(403).json();
    const form = new Form(req.body.name, req.body.questions, user._id!);
    console.log(form);
    const result = await collections.forms.insertOne(form);
    return result.acknowledged ? res.json() : res.status(400).json();
}

async function readForm(req:Request, res:Response): Promise<Response> {
    if (!await auth(req)) return res.status(403).json();
    const id: string = req.query.id as string;
    const result = await collections.forms.findOne({_id:new ObjectId(id)});
    return result ? res.json(result) : res.status(404).json();
}

async function deleteForm(req:Request, res:Response): Promise<Response> {
    if (!await auth(req)) return res.status(403).json();
    const id: string = req.query.id as string;
    const result = await collections.forms.deleteOne({_id:new ObjectId(id)});
    await collections.submits.deleteMany({formId:new ObjectId(id)});
    return result.acknowledged ? res.json() : res.status(404).json();
}

async function getAllForm(req: Request, res: Response): Promise<Response> {
    if (!await auth(req)) return res.status(403).json();
    return res.json(await collections.forms?.find({}).toArray());
}

async function getMySubmits(req: Request, res: Response): Promise<Response> {
    const user = await auth(req);
    if (!user) return res.status(403).json();
    const result = await collections.submits.aggregate([
        { $match: { submiterId: user._id } },
        { $lookup: { from: "forms", localField: "formId", foreignField: "_id", as: "formDetails" } },
        { $unwind: "$formDetails" }
    ]).toArray();
    return res.json(result);
}

async function getSubmitDetails(req: Request, res: Response): Promise<Response> {
    const user = await auth(req);
    if (!user) return res.status(403).json();
    const id = new ObjectId(String(req.query.id));
    const result = await collections.submits.aggregate([
        { $match: { _id: id } },
        { $lookup: { from: "forms", localField: "formId", foreignField: "_id", as: "formDetails" } },
        { $unwind: "$formDetails" }
    ]).toArray();
    console.log(result[0].formDetails.questions);
    return res.json(result[0]);
}

async function getMyForms(req: Request, res: Response): Promise<Response> {
    const user = await auth(req);
    if (!user) return res.status(403).json();
    return res.json(await collections.forms?.find({ownerId: user._id}).toArray());
}

async function sigup(req:Request,res:Response): Promise<Response> {
    const body: {email:string,password:string} = req.body;
    const user = User.from({email: body.email, passHash: new Md5().appendStr(body.password).end() as string});
    const result = (await collections.users?.insertOne(user));
    if (result?.acknowledged) {
        const token = jwt.sign(
            {id:user._id, email:user.email},
            'somesecret',
            {expiresIn:'1d'}
        );
        return res.json({token:token});
    } else {
        return res.status(400).json();
    }
}

async function testAuth(req:Request,res:Response): Promise<Response> {
    const user = await auth(req);
    if (user) {
        return res.json(user);
    } else {
        return res.status(403).end();
    }

}

function auth(req: Request):Promise<User|null> {
    const token = req.header('auth-token')!
    console.log(token);
    const decoded = jwt.decode(token)?.valueOf() as {id:number,email:string} | undefined;
    console.log(decoded);
    if (!decoded) return Promise.resolve(null);
    if ('object' === typeof decoded && 'id' in decoded) {
        return collections.users.findOne({_id: new ObjectId(String(decoded.id))});
    } else {
        return Promise.resolve(null);
    }

}

async function login(req:Request,res:Response): Promise<Response> {
    const body: {email:string,password:string} = req.body;
    const passHash: string = new Md5().appendStr(body.password).end() as string;
    const user = await collections.users?.findOne({email:body.email, passHash:passHash});
    if (user) {
        const token = jwt.sign(
            {id:user._id, email:user.email},
            'somesecret',
            {expiresIn:'1d'}
        );
        return res.json({token:token});
    } else {
        return res.status(403).end();
    }

}


