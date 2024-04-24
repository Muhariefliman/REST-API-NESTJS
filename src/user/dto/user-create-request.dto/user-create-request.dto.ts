import { IsString, MaxLength } from "class-validator";

export class UserCreateRequestDto {

    @IsString()
    @MaxLength(50)
    public name: string;

    @IsString()
    public email: string;

    @IsString()
    public password: string;
    
}
