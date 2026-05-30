# Mineral Enterprises Website

Corporate website for **Mineral Enterprises** — a mining, processing, and international mineral trading company.

**Domain:** [mineralenterprises.net](https://mineralenterprises.net)

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, stats, about preview, products, applications, global markets |
| About | `about.html` | Company story, mission/vision, timeline |
| Products | `products.html` | CaCO₃, iron ore, coal, stone products, packaging |
| Services | `services.html` | Mining, processing, trading, logistics, technical support |
| Quality | `quality.html` | Certifications, QC workflow, testing parameters |
| Contact | `contact.html` | Inquiry form, office details |

## Local Preview

No build step required — open any HTML file in a browser, or serve locally:

```bash
cd /Users/prathyushareddy/Documents/chandraker/mineralenterprises_website
python3 -m http.server 8080
```

Then visit [http://localhost:8080](http://localhost:8080).

## Project Structure

```
mineralenterprises_website/
├── index.html
├── about.html
├── products.html
├── services.html
├── quality.html
├── contact.html
├── css/styles.css
├── js/main.js
├── CNAME                  # For GitHub Pages custom domain
└── README.md
```

## Deployment Options

### GitHub Pages (recommended for static hosting)

1. Push this repo to GitHub as `mineralenterprises_website`
2. Go to **Settings → Pages → Source**: deploy from `main` branch, root folder
3. Under **Custom domain**, enter `mineralenterprises.net`
4. At your domain registrar, add DNS records:
   - **A records** → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **CNAME** for `www` → `chandrakeerthireddy.github.io` (or your GitHub username)

The `CNAME` file in this repo is pre-configured for the custom domain.

### Netlify / Cloudflare Pages

Drag-and-drop the folder or connect the GitHub repo. Point `mineralenterprises.net` DNS to the provider.

## Customization Checklist

- [ ] Add real office and plant addresses in `contact.html`
- [ ] Add phone numbers and LinkedIn/social links
- [ ] Replace placeholder stats with actual company figures
- [ ] Add company logo image (replace text "ME" mark in header)
- [ ] Wire contact form to a backend (Formspree, Netlify Forms, or custom API)
- [ ] Add Google Maps embed on contact page
- [ ] Replace Unsplash stock photos with actual facility/product photos

## Design Reference

Layout and content structure inspired by leading Asian mineral producers such as [YBM Vietnam](https://ybm.com.vn/en/home/) — stats bar, advantages grid, product catalog, applications, and export markets sections.

## License

© 2026 Mineral Enterprises. All rights reserved.
