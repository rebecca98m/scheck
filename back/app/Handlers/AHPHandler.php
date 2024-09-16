<?php

namespace App\Handlers;
class AHPHandler
{
    public static function crea_matrice_comparazione($livello_correlatione): array
    {
        $n = count($livello_correlatione);
        $matrice_comparazione = array_fill(0, $n, array_fill(0, $n, 1));

        for ($i = 0; $i < $n; $i++) {
            for ($j = 0; $j < $n; $j++) {
                if ($i != $j) {
                    $matrice_comparazione[$i][$j] = $livello_correlatione[$i] / $livello_correlatione[$j];
                    $matrice_comparazione[$j][$i] = 1 / $matrice_comparazione[$i][$j];
                }
            }
        }

        return $matrice_comparazione;
    }

    public static function calcola_pesi($matrice): array
    {
        $n = count($matrice);
        $matrice_norm = array();

        // Normalizzazione della matrice
        for ($j = 0; $j < $n; $j++) {
            $column_sum = array_sum(array_column($matrice, $j));
            for ($i = 0; $i < $n; $i++) {
                $matrice_norm[$i][$j] = $matrice[$i][$j] / $column_sum;
            }
        }

        // Calcolo dei pesi
        $pesi = array();
        for ($i = 0; $i < $n; $i++) {
            $pesi[$i] = array_sum($matrice_norm[$i]) / $n;
        }

        return $pesi;
    }

    public static function normalizza_dati($dati): array
    {
        $max_values = array_map('max', array_map(null, ...$dati));
        $dati_normalizzati = array();

        foreach ($dati as $row) {
            $dati_normalizzati[] = array_map(function ($value, $max) {
                return $value / $max;
            }, $row, $max_values);
        }

        return $dati_normalizzati;
    }

    public static function calcola_punteggi_finali($dati_normalizzati, $pesi_criteri): array
    {
        $punteggio_finale = array();

        foreach ($dati_normalizzati as $row) {
            $punteggio = 0;
            foreach ($row as $i => $value) {
                $punteggio += $value * $pesi_criteri[$i];
            }
            $punteggio_finale[] = $punteggio;
        }

        return $punteggio_finale;
    }
}





