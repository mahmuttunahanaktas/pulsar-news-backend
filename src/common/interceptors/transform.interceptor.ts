import { Injectable, NestInterceptor,ExecutionContext,CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import {map, timestamp} from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor{
    intercept(context:ExecutionContext, next:CallHandler):Observable<any>{
        return next.handle().pipe(
            map(data =>({
                //Tüm Api yanıtlarını standart bir formata dönüştür
                succes:true,
                timestamp:new Date().toISOString(),
                data:data
            }))
        );
    }

}