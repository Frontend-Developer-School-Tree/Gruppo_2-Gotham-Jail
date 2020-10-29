const detenutiBtn = document.getElementById('carceratiBtn');
const detenutiList = document.getElementById('carcerati');
const detenutiContainer = document.getElementById('carceratiContainer');

const guardieBtn = document.getElementById('guardieBtn');
const guardieList = document.getElementById('guardie');
const guardieContainer = document.getElementById('guardieContainer');

const addDetenutoBtn = document.getElementById('addDet');
const saveNuovoDet = document.getElementById('salvaAdd');


const urlCriminali = 'https://denebvoice.com/api_gotham/gothamCity.json';
const urlGuardie = './guardie.json'


class Detenuto {
        
    static async getDati() {
        
        const richiesta = await fetch(urlCriminali);
        const dati = await richiesta.json();
        
        const totDet = dati.length;
        const divTot = document.getElementById('countCarcerati');
        
        dati.map( el => {
            const cardDetenuti = document.importNode(detenutiList.content, true);

            cardDetenuti.querySelector('h2').textContent = el.nomePersonaggio;
            cardDetenuti.querySelector('strong').textContent = el.razza;
            cardDetenuti.querySelector('h4').textContent = el.livelloDiPericolo;

          
            let elem = '<ul><li> Altezza: '+el.caratteristicheFisiche.altezza+'</li>'
            elem += '<li> Colore Capelli: '+el.caratteristicheFisiche.coloreCapelli+'</li>'
            elem += '<li> Colore Occhi: '+el.caratteristicheFisiche.coloreOcchi+'</li>'
            elem += '<li> Peso: '+el.caratteristicheFisiche.peso+'</li> </u>';

            cardDetenuti.querySelector('ul').innerHTML = elem;
  
            divTot.innerHTML="Totale Carcerati  "+totDet;
            const div = document.createElement('div');

            return detenutiContainer.appendChild(cardDetenuti);
        })
    }
    
    static show(e){
        
        if(e.target.id === 'carceratiBtn'){
            detenutiContainer.style.visibility = 'visible';
            addDetenutoBtn.style.visibility = 'visible'; 
        } else {
            guardieContainer.style.visibility = 'hidden';
            addDetenutoBtn.style.visibility = 'hidden';
        }
        
    }

    static add(){
        document.getElementById('addForm').style.visibility = 'visible';    
    }
    
    static saveNuovoDet(e){
        e.preventDefault();
        const newDetCard = document.importNode(detenutiList.content, true);
        const inputData = document.getElementById('addDetenuto');

        
        newDetCard.querySelector('h2').textContent = inputData.nome.value;
        newDetCard.querySelector('strong').textContent = inputData.razza.value;
        newDetCard.querySelector('h4').textContent = inputData.pericolo.value;
        
        let elem = '<ul><li> Altezza: '+inputData.altezza.value+'</li>'
        elem += '<li> Colore Capelli: '+inputData.capelli.value+'</li>'
        elem += '<li> Colore Occhi: '+inputData.occhi.value+'</li>'
        elem += '<li> Peso: '+inputData.peso.value+'</li> </u>';
        
        newDetCard.querySelector('ul').innerHTML = elem;

        return detenutiContainer.prepend(newDetCard);
        
    }
    
}


function loadPage(){
    guardieContainer.style.visibility = 'hidden';
    Detenuto.getDati();
    guardieContainer.style.visibility = 'hidden';
    Guardia.getDati();
    document.getElementById('addForm').style.visibility = 'hidden';

}


class Guardia {
    
    static async getDati() {
        
        const richiesta = await fetch(urlGuardie);
        const dati = await richiesta.json();
        
        for (const val in dati) {
            const cardGuardia =  document.importNode(guardieList.content, true);
            
            cardGuardia.querySelector('h6').textContent = dati[val].codiceIdentificativo;
            cardGuardia.querySelector('strong').textContent = dati[val].nomeGuardia;
            cardGuardia.querySelector('span').textContent = dati[val].provenienza;
            cardGuardia.querySelector('h4').textContent = dati[val].esperienza;
            
            return guardieContainer.prepend(cardGuardia);
        }
    }
    
    static show(e){
        if(e.target.id === 'guardieBtn'){
            detenutiContainer.style.visibility = 'hidden';
            addDetenutoBtn.style.visibility = 'hidden';
            document.getElementById('addForm').style.visibility = 'hidden';
            guardieContainer.style.visibility = 'visible';
        } else {
            addDetenutoBtn.style.visibility = 'visible';
        }

    }
}

class App {
    
    static init(){
        loadPage()
        
        detenutiBtn.addEventListener('click', Detenuto.show);
        guardieBtn.addEventListener('click', Guardia.show);
        addDetenutoBtn.addEventListener('click', Detenuto.add);
        saveNuovoDet.addEventListener('click', Detenuto.saveNuovoDet);
    }

}

App.init();