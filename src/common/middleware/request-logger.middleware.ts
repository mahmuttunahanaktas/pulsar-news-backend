import { Injectable,NestMiddleware } from "@nestjs/common";
import { Request,Response,NextFunction } from "express";

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware{
    use(req:Request, res:Response, next:NextFunction){
        //İstek bilgilerini konsola yazdıralım
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);

        //İsteğin başlangıç zamanını kaydedelim.
        req['startTime']=Date.now();

        //Yanıt gönderildikten sonra çalışacak olay:
        res.on('finish',()=>{
            const duration =Date.now() - req['startTime'];
            console.log(`İstek tamamlandı: ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
        });
        //Sonraki middleware veya route handler'a geç.
        next();


    }
}
