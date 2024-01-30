Hur man startar projektet:
Börja med att öppna projektet med att skriva npm install och npm start i bash.

Frågeställningar som vi har tagit ställning till:
* Ska JSON Web Tokens (JWT) användas för auktorisering?
* Bör token lagras i local storage, eller ska man använda session-ID och hämta JWT från backend?
* Ska JWT-lösenordet propageras för att möjliggöra verifiering i varje backend, eller används metoder i auth-servern för autentisering?
* Hur ska man hantera token-förnyelse och utgångstider för att upprätthålla säkerheten och användarvänligheten?
* Vilka säkerhetsmekanismer bör implementeras för att skydda mot Cross-Site Scripting (XSS) och Cross-Site Request Forgery (CSRF)?
* Hur implementeras säker lagring och hantering av känslig användarinformation i enlighet med GDPR?
* Vilka strategier bör användas för att säkerställa säker datakommunikation mellan frontend, auth-server och backend?
* Hur balanseras behovet av stark säkerhet med en smidig och användarvänlig inloggningsprocess?
* På vilket sätt ska systemet hantera olika användarroller och deras åtkomstnivåer?
* Skall  ramverk användas (passport, jwt, ...) eller skall egenutvecklar kod användas.

Det här har vi lagt till för att det ska bli säkert:
Vi har gjort så att användarnamn och lösenord försvinner när man loggar ut.
Frontend server skickar med cookies.
Den tittar så att användaren är autentiserad.
Vi har valt att använda användarnamn istället för email.