# 🧠 MAIN -- Sistema di Analisi Dati

**Autore:** Alessio\
**File:** `main.py`\
**Tipo:** Modulo eseguibile (entry point del progetto)\
**Compatibile con:**\
- `DataLoader`\
- `DataCleaner`\
- `DataAnalyzer`\
- `DataVisualizer`\
- `DataExporter`\
- `SimplePredictor`

------------------------------------------------------------------------

## 📌 Descrizione generale

Il file `main.py` rappresenta il cuore del progetto: un'applicazione
interattiva a menu testuale che consente all'utente di:

-   Caricare dataset CSV\
-   Eseguire pulizia dati step-by-step\
-   Analizzare statisticamente il dataset\
-   Generare grafici con Matplotlib\
-   Esportare dati e analisi\
-   Addestrare un modello di regressione lineare semplice

Il programma funziona completamente da terminale e non richiede
interfacce grafiche.

------------------------------------------------------------------------

## 🏗 Architettura del main

Il flusso del programma è strutturato in 6 macro-sezioni:

1.  Carica dataset\
2.  Pulisci dati\
3.  Analizza dataset\
4.  Visualizza grafici\
5.  Esporta dati\
6.  Modello di predizione

------------------------------------------------------------------------

## 🔧 Inizializzazione delle componenti

``` python
loader = DataLoader()
cleaner = None
analyzer = None
visualizer = None
exporter = None
predictor = None

df = None
```

------------------------------------------------------------------------

## 📌 1) Caricamento Dataset

Operazioni principali: lettura CSV, preview dei dati, inizializzazione
moduli collegati (`DataCleaner`, `DataAnalyzer`, ecc.).

------------------------------------------------------------------------

## 📌 2) Pulizia Dati

Include operazioni come:\
- conversione tipi\
- gestione valori mancanti\
- rimozione duplicati\
- rimozione negativi\
- pulizia completa\
- riepilogo

Tutte le classi vengono aggiornate con il nuovo DataFrame.

------------------------------------------------------------------------

## 📌 3) Analisi del Dataset

Funzioni principali:\
- descrizione statistica\
- missing values\
- tipi di dato\
- correlazioni\
- analisi completa\
- metriche per genere\
- top luoghi

------------------------------------------------------------------------

## 📌 4) Visualizzazione Grafici

Generati tramite `DataVisualizer`.\
Possibilità di salvare i grafici tramite `DataExporter`.

------------------------------------------------------------------------

## 📌 5) Esportazione Dati

Supporta:\
- JSON\
- TXT\
- Analisi completa in JSON

------------------------------------------------------------------------

## 📌 6) Predizione (Machine Learning)

Addestramento modello con `SimplePredictor` e predizione dell'età basata
su input numerico.

------------------------------------------------------------------------

## ▶ Avvio del programma

``` python
if __name__ == "__main__":
    main()
```

------------------------------------------------------------------------

## 📦 Dipendenze

-   pandas\
-   matplotlib\
-   moduli interni del progetto

------------------------------------------------------------------------

## 📘 Conclusione

Il file `main.py` controlla l'intero sistema: dataset, pulizia, analisi,
grafici, esportazioni e modello predittivo.\
Struttura modulare, estendibile e perfetta per workflow di analisi dati.
