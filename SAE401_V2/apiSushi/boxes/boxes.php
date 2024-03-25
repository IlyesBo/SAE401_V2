<?php

class Box {
    private $conn; 

    public function __construct($db) { 
        $this->conn = $db; 
    }

    public function getBox($id) { // méthode pour récupérer les détails d'une boîte à partir de son ID
        $query = "SELECT * FROM boxes"; // requête SQL pour sélectionner toutes les colonnes de la table 'boxes'
        $stmt = $this->conn->prepare($sqlQuery); 
        $stmt->bindParam(":id", $id, PDO::PARAM_INT); // liaison du paramètre :id avec la valeur de l'ID fournie
        if ($stmt->execute()) { 
            return $stmt->fetch(PDO::FETCH_ASSOC); // renvoie la première ligne de résultat sous forme de tableau associatif
        } else { 
            return "Erreur base de données"; 
        }
    }

    public function getAllBoxes() { // méthode pour récupérer toutes les boîtes
        $sqlQuery = "SELECT * FROM `box`"; // requête SQL pour sélectionner toutes les colonnes de la table 'box'
        $stmt = $this->conn->prepare($sqlQuery); 
        if ($stmt->execute()) { 
            return $stmt->fetchAll(PDO::FETCH_ASSOC); // renvoie toutes les lignes de résultat sous forme de tableau associatif
        } else { e
            return "Erreur base de données"; 
        }
    }

    public function getAliments($id) { // méthode pour récupérer les aliments d'une boîte spécifique à partir de son ID
        $sqlQuery = "SELECT aliment.nom, boxaliment.quantite FROM `boxaliment` INNER JOIN `aliment` ON boxaliment.aliment_id = aliment.id_aliment WHERE boxaliment.box_id = :id"; // requête SQL pour sélectionner le nom de l'aliment et sa quantité associée à une boîte spécifique
        $stmt = $this->conn->prepare($sqlQuery); 
        $stmt->bindParam(":id", $id, PDO::PARAM_INT); // liaison du paramètre :id avec la valeur de l'ID fournie
        if ($stmt->execute()) { 
            return $stmt->fetchAll(PDO::FETCH_ASSOC); // renvoie toutes les lignes de résultat sous forme de tableau associatif
        } else { 
            return "Erreur base de données"; 
        }
    }

    public function getSaveur($id) { // méthode pour récupérer les saveurs d'une boîte spécifique à partir de son ID
        $sqlQuery = "SELECT saveur.nom FROM `boxsaveur` INNER JOIN `saveur` ON boxsaveur.saveur_id = saveur.id_saveur WHERE boxsaveur.box_id = :id"; // requête SQL pour sélectionner le nom des saveurs associées à une boîte spécifique
        $stmt = $this->conn->prepare($sqlQuery); 
        $stmt->bindParam(":id", $id, PDO::PARAM_INT); // liaison du paramètre :id avec la valeur de l'ID fournie
        if ($stmt->execute()) { 
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC); // récupère toutes les lignes de résultat sous forme de tableau associatif
            $allSaveurs = []; // initialise un tableau pour stocker les noms des saveurs
            foreach ($results as $result) { 
                $allSaveurs[] = $result["nom"]; // ajoute le nom de la saveur au tableau
            }
            return $allSaveurs; // renvoie le tableau contenant les noms des saveurs
        } else { 
            return "Erreur base de données"; 
        }
    }
}
