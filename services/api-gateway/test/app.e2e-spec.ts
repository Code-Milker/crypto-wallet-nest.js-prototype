import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('API Gateway (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let walletId: number;
  let randomEmail: string;

  beforeAll(async () => {
    randomEmail = `test${Date.now()}@example.com`; // Generate unique email each run

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/v1/auth/register (POST) - register user', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/auth/register')
      .send({ email: randomEmail, password: 'password123' })
      .expect(201); // Adjust to 200 if needed

    expect(response.body).toHaveProperty('access_token');
    token = response.body.access_token;
  });

  it('/api/v1/auth/login (POST) - login user', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ email: randomEmail, password: 'password123' })
      .expect(201); // Adjust to 200 if needed

    expect(response.body).toHaveProperty('access_token');
    token = response.body.access_token;
  });
  //
  it('/api/v1/wallets (POST) - create wallet', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/wallets')
      .set('Authorization', `Bearer ${token}`)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('publicAddress');
    walletId = response.body.id;
  });
  //
  //   it('/api/v1/wallets (GET) - list wallets', async () => {
  //     const response = await request(app.getHttpServer())
  //       .get('/api/v1/wallets')
  //       .set('Authorization', `Bearer ${token}`)
  //       .expect(200);
  //
  //     expect(Array.isArray(response.body)).toBe(true);
  //     expect(response.body.length).toBeGreaterThan(0);
  //   });
  //
  //   it('/api/v1/sign/:walletId (POST) - sign message', async () => {
  //     const response = await request(app.getHttpServer())
  //       .post(`/api/v1/sign/${walletId}`)
  //       .set('Authorization', `Bearer ${token}`)
  //       .send({ message: 'test message' })
  //       .expect(201);
  //
  //     expect(typeof response.text).toBe('string');
  //   });
});
