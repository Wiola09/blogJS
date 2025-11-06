# Blog sa Bazom Podataka V4

Node.js blog aplikacija sa MongoDB bazom podataka.

## Tehnologije

- **Node.js** (v12.18.3)
- **Express.js** - web framework
- **EJS** - template engine
- **MongoDB** - baza podataka (MongoDB Atlas)
- **Mongoose** - MongoDB ODM
- **Body-parser** - parsiranje formi
- **Lodash** - utility biblioteka

## Preduslovi

Pre pokretanja projekta, potrebno je imati instalirano:

- [Node.js](https://nodejs.org/) (verzija 12.18.3 ili novija)
- [npm](https://www.npmjs.com/) (obično dolazi sa Node.js)
- MongoDB Atlas nalog ili lokalni MongoDB server

## Instalacija

1. **Klonirajte ili preuzmite projekat**

2. **Instalirajte zavisnosti:**
   ```bash
   npm install
   ```

3. **Postavite environment varijable za MongoDB (SVE SU OBAVEZNE):**
   
   **Opcija 1: Koristite .env fajl (preporučeno za lokalni razvoj)**
   
   Kreirajte `.env` fajl u root direktorijumu projekta:
   ```bash
   # Windows
   type nul > .env
   
   # Linux/Mac
   touch .env
   ```
   
   Zatim uredite `.env` fajl i dodajte SVE potrebne MongoDB credentials:
   ```env
   MONGODB_USERNAME=your_mongodb_username
   MONGODB_PASSWORD=your_mongodb_password_here
   MONGODB_CLUSTER=your_cluster.mongodb.net
   MONGODB_DATABASE=your_database_name
   ```
   
   **⚠️ VAŽNO:** 
   - `.env` fajl je već u `.gitignore` i neće biti uploadovan na GitHub
   - SVE četiri varijable su OBAVEZNE - aplikacija neće raditi bez njih
   - Za instalaciju `dotenv` paketa: `npm install dotenv`
   - Aplikacija već automatski učitava `.env` fajl na početku
   
   **Opcija 2: Environment varijable direktno (za testiranje)**
   
   **Windows (CMD):**
   ```cmd
   set MONGODB_USERNAME=your_mongodb_username
   set MONGODB_PASSWORD=your_mongodb_password
   set MONGODB_CLUSTER=your_cluster.mongodb.net
   set MONGODB_DATABASE=your_database_name
   ```
   
   **Windows (PowerShell):**
   ```powershell
   $env:MONGODB_USERNAME="your_mongodb_username"
   $env:MONGODB_PASSWORD="your_mongodb_password"
   $env:MONGODB_CLUSTER="your_cluster.mongodb.net"
   $env:MONGODB_DATABASE="your_database_name"
   ```
   
   **Linux/Mac:**
   ```bash
   export MONGODB_USERNAME=your_mongodb_username
   export MONGODB_PASSWORD=your_mongodb_password
   export MONGODB_CLUSTER=your_cluster.mongodb.net
   export MONGODB_DATABASE=your_database_name
   ```
   
   **Legacy support:**
   - Možete koristiti `PASS` umesto `MONGODB_PASSWORD`
   - Ostale tri varijable su i dalje obavezne

## Pokretanje

1. **Pokrenite aplikaciju:**
   ```bash
   node app.js
   ```

2. **Otvorite web browser i idite na:**
   ```
   http://localhost:3000
   ```

3. Aplikacija će se pokrenuti na portu 3000.

## Struktura projekta

```
Blog-with-Database-V4/
├── app.js              # Glavni server fajl
├── package.json        # Node.js zavisnosti i konfiguracija
├── package-lock.json   # Zaključane verzije zavisnosti
├── Procfile            # Konfiguracija za deployment (Heroku)
├── public/             # Statički fajlovi (CSS, JS, slike)
│   └── css/
│       └── styles.css
└── views/              # EJS template fajlovi
    ├── home.ejs
    ├── about.ejs
    ├── contact.ejs
    ├── compose.ejs
    ├── post.ejs
    └── partials/
        ├── header.ejs
        └── footer.ejs
```

## Funkcionalnosti

- **Home** (`/`) - Prikazuje sve blog postove
- **About** (`/about`) - Informacije o aplikaciji
- **Contact** (`/contact`) - Kontakt informacije
- **Compose** (`/compose`) - Kreiranje novog blog posta
- **Post** (`/posts/:postId`) - Prikaz pojedinačnog posta

## Deployment

Projekat ima `Procfile` koji je konfigurisan za deployment na platforme kao što je Heroku.

## Dodatne informacije

- MongoDB konekcija koristi environment varijable za username, password, cluster i database name
- Aplikacija koristi MongoDB Atlas cloud bazu podataka
- Server se pokreće na portu 3000

## Folders koji se mogu obrisati (slično kao Python venv)

**⚠️ VAŽNO:** Ovi folderi se mogu obrisati, ali moraju se ponovo instalirati pre pokretanja aplikacije.

### `node_modules/` folder

Folder `node_modules/` je **ekvivalent Python venv folderu**. Sadrži sve instalirane Node.js pakete i zavisnosti.

**Možete ga obrisati:**
```bash
# Windows
rmdir /s node_modules

# Linux/Mac
rm -rf node_modules
```

**Kako ponovo instalirati:**
```bash
npm install
```

Ovo će ponovo instalirati sve zavisnosti na osnovu `package.json` i `package-lock.json` fajlova.

**Kada obrisati `node_modules/`:**
- Kada želite da oslobodite prostor na disku
- Kada imate problema sa zavisnostima i želite čistu instalaciju
- Kada želite da proverite da li projekat ima sve potrebne informacije za instalaciju

**⚠️ NE brišite:**
- `package.json` - definiše zavisnosti projekta
- `package-lock.json` - zaključava tačne verzije zavisnosti
- `node_modules/` pre nego što imate backup `package.json` i `package-lock.json`

## Bezbednosna preporuke

**⚠️ VAŽNO:** Ovaj projekat je bio ažuriran sa bezbednosnim poboljšanjima:

1. **`.env` fajl je u `.gitignore`** - Vaši credentials neće biti uploadovani na GitHub
2. **Environment varijable** - Svi osetljivi podaci (password, username, cluster) su sada u environment varijablama
3. **Provera password-a** - Aplikacija će se zaustaviti ako password nije postavljen
4. **Fleksibilna konfiguracija** - Možete koristiti i `.env` fajl i system environment varijable

**Šta je promenjeno:**
- Dodato `.env` u `.gitignore` da se ne uploaduje na GitHub
- MongoDB connection string sada koristi environment varijable umesto hardcoded vrednosti
- Dodata provera da li password postoji
- Dodata podrška za `.env` fajl (opciono, ako instalirate `dotenv`)

**Preporuka:** 
- Koristite `.env` fajl za lokalni razvoj (ne uploadujte ga na GitHub!)
- Koristite environment varijable na production serveru (Heroku, AWS, itd.)
- Nikad ne commit-ujte `.env` fajl u Git

## Rešavanje problema

**Problem: Ne mogu da se povežem sa bazom podataka**
- Proverite da li je postavljena environment varijabla `MONGODB_PASSWORD` ili `PASS`
- Proverite da li je MongoDB Atlas klaster aktivan
- Proverite da li je IP adresa vašeg računara dodata u MongoDB Atlas whitelist
- Ako koristite `.env` fajl, proverite da li je instaliran `dotenv` paket: `npm install dotenv`

**Problem: Port 3000 je zauzet**
- Promenite port u `app.js` na liniji gde je `app.listen(3000, ...)`
- Ili zaustavite drugu aplikaciju koja koristi port 3000

**Problem: `node_modules` folder je obrisan i ne mogu da pokrenem aplikaciju**
- Pokrenite `npm install` da ponovo instalirate zavisnosti

**Problem: "MongoDB password not provided!" ili druge environment varijable greške**
- Postavite SVE obavezne environment varijable:
  - `MONGODB_USERNAME`
  - `MONGODB_PASSWORD` (ili `PASS` za legacy)
  - `MONGODB_CLUSTER`
  - `MONGODB_DATABASE`
- Ili kreirajte `.env` fajl sa svim četiri varijable
- Proverite da li su sve varijable postavljene pre pokretanja aplikacije

