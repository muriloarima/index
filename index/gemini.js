 Arquivo netlifyfunctionsgemini.js (Versão de Depuração)

export default async (req) = {
  try {
     Pega a chave de API secreta
    const apiKey = Deno.env.get(GEMINI_API_KEY);

     1. A função vai primeiro verificar se encontrou a chave.
    if (!apiKey) {
      throw new Error(A variável de ambiente GEMINI_API_KEY não foi encontrada no servidor Netlify.);
    }

    const { prompt } = await req.json();
    if (!prompt) {
      throw new Error(O prompt enviado pelo site está vazio.);
    }

    const apiUrl = `httpsgenerativelanguage.googleapis.comv1betamodelsgemini-2.0-flashgenerateContentkey=${apiKey}`;
    
    const payload = {
      contents [{ role user, parts [{ text prompt }] }]
    };

     2. A função vai tentar se comunicar com o Google.
    const response = await fetch(apiUrl, {
      method 'POST',
      headers { 'Content-Type' 'applicationjson' },
      body JSON.stringify(payload)
    });

    const data = await response.json();

     3. Se o Google retornar um erro, a função vai nos avisar.
    if (!response.ok) {
      throw new Error(data.error.message  `Erro da API do Google ${response.statusText}`);
    }
    
     4. Se tudo der certo, ela envia a resposta.
    return new Response(JSON.stringify(data), {
      headers { 'Content-Type' 'applicationjson' },
      status 200
    });

  } catch (error) {
     5. Se QUALQUER coisa der errado, esta parte do código será executada.
     Ela vai criar uma mensagem de erro clara e enviá-la de volta.
    console.error(ERRO NA FUNÇÃO NETLIFY, error.message);
    return new Response(JSON.stringify({ 
      error Ocorreu um erro no servidor da Netlify.,
      details error.message 
    }), {
      status 500,
      headers { 'Content-Type' 'applicationjson' }
    });
  }
};

export const config = {
  path .netlifyfunctionsgemini,
};