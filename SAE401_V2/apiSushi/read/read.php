<?php

// Définition des en-têtes CORS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Inclusion des fichiers nécessaires
require "../database/database.php";
require "../boxes/boxes.php";

// Connexion à la base de données
$database = new Database();
$db = $database->getConnection();

// Création de l'objet Box
$box = new Box($db);

// Vérification de l'existence de l'ID dans la requête GET
if (!isset($_GET["id"])) {
    // Récupération de toutes les boîtes
    $stmt = $box->getAllBoxes();
    // Vérification du nombre d'enregistrements récupérés
    $itemCount = $stmt->rowCount();
    if ($itemCount > 0) {
        $boxArr = []; // Initialisation d'un tableau pour stocker les informations des boîtes
        // Parcours des résultats
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row); // Extraction des données de la ligne en tant que variables
            // Récupération des aliments associés à la boîte
            $aliments_stmt = $box->getAlimentsByBoxId($id);
            $alimentsArr = [];
            while ($aliment_row = $aliments_stmt->fetch(PDO::FETCH_ASSOC)) {
                $alimentsArr[] = $aliment_row['nom_aliment'];
            }
            // Récupération des saveurs associées à la boîte
            $saveurs_stmt = $box->getSaveursByBoxId($id);
            $saveursArr = [];
            while ($saveur_row = $saveurs_stmt->fetch(PDO::FETCH_ASSOC)) {
                $saveursArr[] = $saveur_row['nom_saveur'];
            }
            // Construction des informations de la boîte dans un tableau
            $boxInfo = [
                "id" => $id,
                "nom" => $nom,
                "pièces" => $pieces,
                "prix" => $prix,
                "image" => $image,
                "aliments" => $alimentsArr,
                "saveurs" => $saveursArr
            ];
            array_push($boxArr, $boxInfo); // Ajout des informations de la boîte au tableau
        }
        echo json_encode($boxArr); // Conversion du tableau en JSON et affichage
    } else {
        // Aucune boîte trouvée
        http_response_code(404);
        echo json_encode(["message" => "Aucune boîte trouvée."]);
    }
} else {
    // Si un ID est spécifié dans la requête GET
    $box->id = $_GET["id"];
    
    // Récupération des informations de la boîte spécifiée par son ID
    $stmt = $box->getAllBoxes(); // (Probable erreur: devrait être $stmt = $box->getBox();)
    $boxCount = count($stmt);
    if ($boxCount > 0) {
        $boxArr = [];
        foreach ($stmt as $row) {
            extract($row);
            $aliments_stmt = $box->getAlimentsByBoxId($id);
            $alimentsArr = [];
            while ($aliment_row = $aliments_stmt->fetch(PDO::FETCH_ASSOC)) {
                $alimentsArr[] = $aliment_row['nom_aliment'];
            }
            $saveurs_stmt = $box->getSaveursByBoxId($id);
            $saveursArr = [];
            while ($saveur_row = $saveurs_stmt->fetch(PDO::FETCH_ASSOC)) {
                $saveursArr[] = $saveur_row['nom_saveur'];
            }
            $boxInfo = [
                "id" => $id,
                "nom" => $nom,
                "pièces" => $pieces,
                "prix" => $prix,
                "image" => $image,
                "aliments" => $alimentsArr,
                "saveurs" => $saveursArr
            ];
            array_push($boxArr, $boxInfo);
        }
        echo json_encode($boxArr); 
    } else {
        // Aucune boîte trouvée avec cet ID
        http_response_code(404);
        echo json_encode(["message" => "Aucune boîte trouvée avec cet ID."]);
    }
}
?>
