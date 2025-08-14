// Arquivo: netlify/functions/hello.js

export default async () => {
  return new Response("Olá do servidor Netlify! A função está funcionando.", {
    headers: { 'Content-Type': 'text/plain' },
  });
};

export const config = {
  path: "/.netlify/functions/hello",
};