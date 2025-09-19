import { Controller, All, Req, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import type { Request, Response } from 'express';
import { lastValueFrom } from 'rxjs';

@Controller()
export class GatewayController {
  constructor(private readonly httpService: HttpService) {}

  @All('*')
  async proxy(@Req() req: Request, @Res() res: Response) {
    let target = '';
    let path = req.originalUrl;

    if (req.path.startsWith('/auth')) {
      target = process.env.AUTH_API_URL!;
    } else if (req.path.startsWith('/student')) {
      target = process.env.STUDENT_API_URL!;
      // luôn xóa /student khỏi URL
      path = req.originalUrl.replace(/^\/student/, '');
    } else if (req.path.startsWith('/notification')) {
      target = process.env.NOTIFICATION_API_URL!;
    } else {
      return res.status(404).json({ message: 'Service not found' });
    }

    const url = target + path;
    console.log('Proxy:', req.method, url, req.body);

    try {
      // bỏ content-length để tránh mismatch
      const { ['content-length']: _, ...headers } = req.headers;

      const response = await lastValueFrom(
        this.httpService.request({
          method: req.method as any,
          url,
          data: req.body,
          headers,
        }),
      );
      res.status(response.status).json(response.data);
    } catch (err: any) {
      if (err.response) {
        res.status(err.response.status).json(err.response.data);
      } else {
        res.status(500).json({ message: 'Gateway error', error: err.message });
      }
    }
  }
}
