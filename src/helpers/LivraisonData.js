export const EtatOptions = [
  { value: "1", label: "Vendeur" },
  { value: "2", label: "Pending" },
  { value: "3", label: "En cours" },
  { value: "4", label: "Terminée" },
  { value: "5", label: "Annulée" },
  { value: "6", label: "Retour" },
];

export const columnsParEtat = [
  [
    "livraison_id",
    "tracking",
    "nom_client",
    "num_port_1",
    "nom_wilaya",
    "produit",
    "prix_livraison",
    "type_service",
    "date_ramassage",
  ],

  [
    "livraison_id",
    "tracking",
    "nom_client",
    "num_port_1",
    "nom_wilaya",
    "produit",
    "prix_livraison",
    "type_service",
    "last_etat_liv_date",
    "last_etat_liv",
  ],

  [
    "livraison_id",
    "tracking",
    "nom_client",
    "num_port_1",
    "nom_wilaya",
    "produit",
    "prix_livraison",
    "type_service",
    "last_etat_liv_date",
    "last_etat_liv",
  ],
];
