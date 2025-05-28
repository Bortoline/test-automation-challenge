// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Testes de API para validar endpoints da JSONPlaceholder API
 * 
 * Estes testes validam diferentes métodos HTTP (GET, POST, PUT, DELETE)
 * e verificam status codes, headers e corpo de resposta.
 */

test.describe('Testes de API - JSONPlaceholder', () => {
  const baseUrl = 'https://jsonplaceholder.typicode.com';

  test('GET - Deve retornar lista de posts com status 200', async ({ request }) => {
    const response = await request.get(`${baseUrl}/posts`);
    
    expect(response.status()).toBe(200);

    expect(response.headers()['content-type']).toContain('application/json');
    
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBeTruthy();
    expect(responseBody.length).toBeGreaterThan(0);
    
    const firstPost = responseBody[0];
    expect(firstPost).toHaveProperty('id');
    expect(firstPost).toHaveProperty('title');
    expect(firstPost).toHaveProperty('body');
    expect(firstPost).toHaveProperty('userId');
  });

  test('GET - Deve retornar um post específico com status 200', async ({ request }) => {
    const postId = 1;
    const response = await request.get(`${baseUrl}/posts/${postId}`);
    
    expect(response.status()).toBe(200);
    
    expect(response.headers()['content-type']).toContain('application/json');
    
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id', postId);
    expect(responseBody).toHaveProperty('title');
    expect(responseBody).toHaveProperty('body');
    expect(responseBody).toHaveProperty('userId');
  });

  test('GET - Deve retornar 404 para post inexistente', async ({ request }) => {
    const response = await request.get(`${baseUrl}/posts/9999`);
    
    expect(response.status()).toBe(404);
    
    const responseBody = await response.json();
    expect(responseBody).toEqual({});
  });

  test('POST - Deve criar um novo post com status 201', async ({ request }) => {
    const newPost = {
      title: 'Teste Automatizado Playwright',
      body: 'Este é um teste de criação de post usando Playwright',
      userId: 1
    };
    
    const response = await request.post(`${baseUrl}/posts`, {
      data: newPost
    });
    
    expect(response.status()).toBe(201);
    
    expect(response.headers()['content-type']).toContain('application/json');
    
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id');
    expect(responseBody.title).toBe(newPost.title);
    expect(responseBody.body).toBe(newPost.body);
    expect(responseBody.userId).toBe(newPost.userId);
  });

  test('PUT - Deve atualizar um post existente com status 200', async ({ request }) => {
    const postId = 1;
    const updatedPost = {
      title: 'Título Atualizado',
      body: 'Conteúdo atualizado pelo teste automatizado',
      userId: 1
    };
    
    const response = await request.put(`${baseUrl}/posts/${postId}`, {
      data: updatedPost
    });
    
    expect(response.status()).toBe(200);
    
    expect(response.headers()['content-type']).toContain('application/json');
    
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id', postId);
    expect(responseBody.title).toBe(updatedPost.title);
    expect(responseBody.body).toBe(updatedPost.body);
    expect(responseBody.userId).toBe(updatedPost.userId);
  });

  test('PATCH - Deve atualizar parcialmente um post com status 200', async ({ request }) => {
    const postId = 1;
    const partialUpdate = {
      title: 'Apenas o Título Atualizado'
    };
    
    const response = await request.patch(`${baseUrl}/posts/${postId}`, {
      data: partialUpdate
    });
    
    expect(response.status()).toBe(200);
    
    expect(response.headers()['content-type']).toContain('application/json');
    
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id', postId);
    expect(responseBody.title).toBe(partialUpdate.title);
    expect(responseBody).toHaveProperty('body');
    expect(responseBody).toHaveProperty('userId');
  });

  test('DELETE - Deve excluir um post com status 200', async ({ request }) => {
    const postId = 1;
    const response = await request.delete(`${baseUrl}/posts/${postId}`);
    
    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    expect(Object.keys(responseBody).length).toBeLessThanOrEqual(1);
  });
});
