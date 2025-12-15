import express from "express";
import cors from "cors";
import Parser from "rss-parser";
import https from "https";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // OK para localhost

const app = express();
const parser = new Parser();
app.use(cors());

// Servir arquivos estáticos do build do Vite
app.use(express.static(path.join(__dirname, "../dist")));

// ===== FALLBACK PADRÃO =====
const noticiasFallback = [
  {
    titulo: "SEMADES promove ações sustentáveis em Campo Grande",
    link: "https://www.campogrande.ms.gov.br/semades/",
    imagem: "https://picsum.photos/800/600?random=1",
  },
  {
    titulo: "Prefeitura investe em energia limpa e inovação",
    link: "https://www.campogrande.ms.gov.br/semades/",
    imagem: "https://picsum.photos/800/600?random=2",
  },
  {
    titulo: "Desenvolvimento Urbano e Sustentabilidade",
    link: "https://www.campogrande.ms.gov.br/semades/",
    imagem: "https://picsum.photos/800/600?random=3",
  },
  {
    titulo: "Gestão ambiental e planejamento urbano integrados",
    link: "https://www.campogrande.ms.gov.br/semades/",
    imagem: "https://picsum.photos/800/600?random=4",
  },
  {
    titulo: "Campo Grande fortalece políticas de sustentabilidade",
    link: "https://www.campogrande.ms.gov.br/semades/",
    imagem: "https://picsum.photos/800/600?random=5",
  },
];

app.get("/api/noticias", async (req, res) => {
  try {
    const agent = new https.Agent({ rejectUnauthorized: false });
    const feed = await parser.parseURL("https://www.campogrande.ms.gov.br/semades/feed/", { agent });

    if (!feed || !feed.items || feed.items.length === 0) {
      console.warn("⚠️ Nenhum item encontrado no feed, usando fallback...");
      return res.json(noticiasFallback);
    }

    const noticias = feed.items.slice(0, 5).map((item) => ({
      titulo: item.title,
      link: item.link,
      imagem: item.enclosure?.url || "https://picsum.photos/800/600",
    }));

    res.json(noticias);
  } catch (error) {
    console.error("❌ Erro ao buscar o feed, usando fallback:", error.message);
    res.json(noticiasFallback);
  }
});

// Todas as outras rotas devem retornar o index.html (para o React Router funcionar)
// Em Express 5, use um padrão válido "(.*)" em vez de "*"
// Middleware para servir index.html em qualquer rota não-API (SPA fallback)
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile(path.join(__dirname, "../dist/index.html"));
  }
  next();
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`));
