import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService){}
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.TokenExtractor(request);

        if(!token) throw new UnauthorizedException();

        try{
            const payload = this.jwtService.verifyAsync(token, {
                secret: "test-secret-key"
            });

            request['user'] = payload;

        }catch(e){
            throw new UnauthorizedException();
        }

        return true;
    }


    private TokenExtractor(request: Request): string | undefined{
        const header = request.headers['authorization'];
        if(!header) return undefined;
        const [bearer, token] = header.split(' ');
        if(!/^Bearer$/i.test(bearer)) return undefined;
        return token;
    }
}
