import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { formatWilayasCommunes } from "../../helpers/HelperFunctions";
import { useState, useEffect } from "react";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
function Adresse({
  setCommune,
  setWilaya,
  handleChange,
  disabled,
  wilaya,
  commune,
  adresse,
  checked,
}) {
  const mobile = useMediaQuery({
    query: "(max-width : 480px)",
  });
  const idVendeur = 1608; // pour le moment la valeur 1608
  const [wilayaOptions, setWilayaOptions] = useState([]);
  const [wilayaID, setWilayaID] = useState(0);
  const fetchWilayas = async () => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/bo/api.php?action=get_wilayas&id_vendeur=${idVendeur}`
      )
      .catch((error) => console.log(error));
    if (response.data.response) {
      const wilayas = formatWilayasCommunes(response.data.content);
      setWilayaOptions(wilayas);
    }
  };
  

  useEffect(() => {
    if (!disabled) {
      fetchWilayas();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return(
   <div className="flex flex-row justify-start gap-4">
    <FormSelect
            title="Wilaya"
            setValue={setWilaya}
            width={220}
            options={wilayaOptions}
            wilaya
            setWilayaId={setWilayaID}
            disabled={disabled}
          />

   </div>
  );
}
export default Adresse;