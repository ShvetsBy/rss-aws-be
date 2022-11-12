import { All, Controller, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @All('/*')
  handleRoutes(@Req() req, @Res() res) {
    return this.appService.handleRoutes(req, res);
  }
}
