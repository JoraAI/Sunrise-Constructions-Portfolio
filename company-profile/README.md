# Sunrise Constructions — Company Profile Pack

Assets for client outreach and capability presentations.

| File | Description |
|------|-------------|
| `sunrise-logo.png` | Premium horizontal logo (navy + gold) |
| `logo-brand.png` | Existing brand logo used in inner pages |
| `Sunrise-Constructions-Company-Profile.pdf` | 8-page premium company profile PDF |
| `company-profile.html` | Source for regenerating the PDF |

## Regenerate PDF

```bash
cd company-profile
chromium-browser --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=Sunrise-Constructions-Company-Profile.pdf \
  --virtual-time-budget=15000 \
  "file://$(pwd)/company-profile.html"
```

## Contact

**info@sunrisegroupltd.in** · Nagpur, Maharashtra
