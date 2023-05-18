export const formatEtatPaiement = (options, paiements) => {
  return paiements.map((paiement) => {
    const { label } = options.find(
      (etat) => etat.value === paiement.etat_paiement
    );
    return { ...paiement, etat_paiement: label };
  });
};

export const typeReplacement = (data) => {
  return data.map((element) => {
    switch (element.type_service) {
      case "std": {
        return { ...element, type_service: "Standard à domicile" };
      }
      case "exp": {
        return { ...element, type_service: "Expresse à domicile" };
      }
      case "pr": {
        return { ...element, type_service: "Point relais" };
      }
      case "ret": {
        return { ...element, type_service: "Retour a domicile" };
      }
      case "pr ret": {
        return { ...element, type_service: "Retour point relais" };
      }
      case "exch": {
        return { ...element, type_service: "Echange" };
      }
      default:
        return { ...element };
    }
  });
};
// just a function to format the header
export const formatHeader = (header) => {
  if (header === "nom_complet") {
    return "Nom Complet";
  }
  if (header === "prix_achat") {
    return "Prix d'achat";
  }
  const splitted = header.split("_");
  if (splitted[0] === "nom") {
    return splitted[1].charAt(0).toUpperCase() + splitted[1].slice(1);
  }
  if (splitted[0] === "num") {
    return "Téléphone";
  }

  return splitted[0].charAt(0).toUpperCase() + splitted[0].slice(1);
};

// custom filter function for date range filter
// const dateBetweenFilterFn = (id, rows, filterValues) => {
//   const sd = filterValues[0] ? new Date(filterValues[0]) : undefined;
//   const ed = filterValues[1] ? new Date(filterValues[1]) : undefined;
//   if (ed || sd) {
//     return rows.filter((row) => {
//       const cellDate = new Date(row.values[id]);

//       if (ed && sd) {
//         return cellDate >= sd && cellDate <= ed;
//       } else if (sd) {
//         return cellDate >= sd;
//       } else {
//         return cellDate <= ed;
//       }
//     });
//   } else {
//     return rows;
//   }
// };
export const formatWilayasCommunes = (data) => {
  return data.map((element) => {
    if (element.code) {
      return {
        id: element.code,
        label: element.nom,
        value: element.nom,
      };
    } else {
      return {
        id: element.id,
        label: element.nom,
        value: element.nom,
      };
    }
  });
};

export const formatAttributs = (products) => {
  return products.map((product) => {
    const attributs = Object.values(product.attributs).map((attribut) => {
      return `${attribut}`;
    });
    return { ...product, attributs: attributs.join(" , ") };
  });
};
export const formatWilayas = (wilayas, data) => {
  return data.map((element) => {
    const dep = wilayas.find((wilaya) => wilaya.code === element.depart);
    const arr = wilayas.find((wilaya) => wilaya.code === element.arrive);
    const depart = dep.nom;
    const arrive = arr.nom;
    const newTarif = { ...element, depart: depart, arrive: arrive };
    return newTarif;
  });
};
export const formatWilayasInverse = (wilayas, data, id) => {
  if (id === 1) {
    const dep = wilayas.find((wilaya) => wilaya.nom === data.depart);
    const depart = dep.code;
    return { ...data, depart: depart };
  } else if (id === 2) {
    const arr = wilayas.find((wilaya) => wilaya.nom === data.arrive);
    const arrive = arr.code;
    return { ...data, arrive: arrive };
  } else if (id === 3) {
    const dep = wilayas.find((wilaya) => wilaya.nom === data.depart);
    const depart = dep.code;
    const arr = wilayas.find((wilaya) => wilaya.nom === data.arrive);
    const arrive = arr.code;
    return { ...data, depart: depart, arrive: arrive };
  } else {
    return data;
  }
};
export const formatPrOptions = (options) => {
  return options.map((option) => {
    return { id: option.id_RPP, value: option.id_RPP, label: option.name };
  });
};
export const formatProductOptions = (products) => {
  return products.map((product) => {
    return {
      id: product.id,
      value: product.id,
      label: product.reference,
    };
  });
};
export const getStates = (state) => {
  switch (parseInt(state)) {
    case 1:
      return ["1"];
    case 2:
      return ["7"];
    case 3:
      return ["2", "3", "4", "5", "8", "15", "16", "19", "25", "26", "27", ""];
    case 4:
      return ["6", "24", "30", "14"];
    case 5:
      return ["9", "10", "11", "18", "23", "28", "32", "14", "29"];
    case 6:
      return ["20", "21", "22", "31"];
    default:
      break;
  }
};
