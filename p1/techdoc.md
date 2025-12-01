# Documentazione Tecnica - Analisi Dati

## Moduli Inclusi

-   **Data Loader**
-   **Data Cleaner**
-   **Data Analyzer**
-   **Data Visualizer**
-   **Data Exporter**
-   **Predictor**
-   **Main**

------------------------------------------------------------------------

## 1. Data Loader

### Funzione principale

Responsabile del caricamento dei dati da file CSV, Excel o altre fonti
strutturate.

### Funzionalità

-   Verifica percorso file
-   Gestione errori di lettura
-   Logging dello stato di caricamento
-   Conversione immediata in DataFrame

### Output

Restituisce un oggetto DataFrame pronto per gli step successivi.

------------------------------------------------------------------------

## 2. Data Cleaner

### Funzione principale

Pulizia e pre-elaborazione dei dati.

### Funzionalità

-   Gestione valori nulli
-   Conversione tipi dati
-   Rimozione duplicati
-   Normalizzazione nomi colonne
-   Filtraggio dataset

### Output

DataFrame sanificato, con schema coerente e pronto per analisi.

------------------------------------------------------------------------

## 3. Data Analyzer

### Funzione principale

Analisi statistica e matematica del dataset.

### Funzionalità

-   Statistiche descrittive
-   Analisi per colonna
-   Individuazione outlier
-   Calcolo medie, varianze, distribuzioni
-   Aggregazioni per gruppi

### Output

Oggetti numerici e report statistici, passabili al visualizzatore.

------------------------------------------------------------------------

## 4. Data Visualizer

### Funzione principale

Creazione grafici e visualizzazioni dai dati elaborati.

### Funzionalità

-   Istogrammi
-   Scatter plot
-   Box plot
-   Line plot
-   Evidenziazione misure statistiche calcolate dal Data Analyzer

### Output

Grafici Matplotlib visualizzabili o salvabili.

------------------------------------------------------------------------

## 5. Data Exporter

### Funzione principale

Esporta dati e risultati.

### Funzionalità

-   Salvataggio CSV, Excel, JSON
-   Gestione path di output
-   Sovrascrittura controllata
-   Logging dei file generati

### Output

File su disco, pronti per uso esterno.

------------------------------------------------------------------------

## 6. Predictor

### Funzione principale

Predizione basata su un modello addestrato.

### Funzionalità

-   Pre-processing coerente con Data Cleaner
-   Caricamento modello
-   Predizione singola o batch
-   Gestione errori e output formattato

### Output

Valori previsti + eventuali metriche.

------------------------------------------------------------------------

## 7. Main

### Funzione principale

Coordinamento di tutti i moduli.

### Funzionalità

-   Orchestrazione pipeline: Load → Clean → Analyze → Visualize → Export
    / Predict
-   Menu o interfaccia principale
-   Logging centralizzato

------------------------------------------------------------------------

## Architettura Complessiva

    Main
     ├── Data Loader
     ├── Data Cleaner
     ├── Data Analyzer
     ├── Data Visualizer
     ├── Data Exporter
     └── Predictor

------------------------------------------------------------------------

## Note Finali

Questa documentazione descrive la struttura modulare del progetto, utile
per manutenzione, estensioni e integrazioni future.
