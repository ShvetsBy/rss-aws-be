import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, lastValueFrom, map, tap } from 'rxjs';
import axios from 'axios';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async handleRoutes(req, res) {
    const APISelector = req.url.split('/')[1];
    const APIurl = process.env[APISelector];
    const axiosConfig = {
      method: req.method,
      url: APIurl + req.url,
      ...(Object.keys(req.body || {}).length > 0 && {
        data: req.body,
      }),
    };

    switch (req.method) {
      case 'POST':
        try {
          const response = await this.httpService.axiosRef.request(axiosConfig);
          const result = {
            status: response.status,
            data: response.data,
            headers: response.headers,
          };
          return res.send(result);
        } catch (e) {
          console.log(e);
        }

      case 'GET':
        const response = await firstValueFrom(
          this.httpService.request(axiosConfig),
        );

        res.send(response.data);

      default:
        res.status(502).send('Cannot process request');
    }
    return 'handle routes';
  }
}
