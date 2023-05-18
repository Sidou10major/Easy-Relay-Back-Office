import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { formatWilayasCommunes } from "../../helpers/HelperFunctions";
import { useState, useEffect } from "react";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import { useField } from "formik";
import RadioButton from "./RadioButton";
function AdresseSelect({
  setCommune,
  setWilaya,
  handleChange,
  disabled,
  wilaya,
  commune,
  adresse,
  checked,
  formik,
  ...props
}) {
  const [field] = useField(props);
  const mobile = useMediaQuery({
    query: "(max-width : 480px)",
  });
  const idVendeur = 1608; // pour le moment la valeur 1608
  const [wilayaOptions, setWilayaOptions] = useState([]);
  const [communeOptions, setCommuneOptions] = useState([]);
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
  const fetchCommunes = async () => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/bo/api.php?action=get_communes&id_vendeur=${idVendeur}&id_wilaya=${wilayaID}`
      )
      .catch((error) => console.log(error));
    if (response.data.response) {
      const communes = formatWilayasCommunes(response.data.content);

      setCommuneOptions(communes);
    }
  };

  useEffect(() => {
    if (!disabled && wilayaID !== 0) {
      fetchCommunes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wilayaID]);

  useEffect(() => {
    if (!disabled) {
      fetchWilayas();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <FormControl>
      <RadioGroup name={field.name} onChange={handleChange}>
        <FormControlLabel
          control={
            <RadioButton
              id="selection_maison"
              disabled={disabled}
              checked={checked}
              name={field.name}
              value="maison"
            />
          }
          label="Adresse de la maison"
        />
        <div className="flex flex-row justify-center gap-4 mobile:flex-col">
          <FormSelect
            placeholder={wilaya ? wilaya : "Wilaya"}
            title="Wilaya"
            id="selection_maison"
            name="wilaya_maison"
            setValue={setWilaya}
            formik={formik}
            width={mobile ? 300 : 192}
            options={wilayaOptions}
            wilaya
            setWilayaId={setWilayaID}
            disabled={disabled}
          />
          <FormSelect
            placeholder={commune ? commune : "Commune"}
            title="Commune"
            name="commune_maison"
            setValue={setCommune}
            formik={formik}
            width={mobile ? 300 : 192}
            options={communeOptions}
            disabled={disabled}
            commune
          />
        </div>
        <div className="flex justify-center items-center mt-3">
          <FormInput
            type="text"
            name="adresse_maison"
            placeholder={adresse ? adresse : "Adresse"}
            size={mobile ? "" : "large"}
            onChange={handleChange}
            disabled={disabled}
          />
        </div>

        <FormControlLabel
          control={
            <RadioButton
              id="selection_bureau"
              disabled={disabled}
              checked={checked}
              name={field.name}
              value="bureau"
            />
          }
          label="Adresse du bureau"
        />
        <div className="flex felx-row justify-center gap-4 mobile:flex-col">
          <FormSelect
            placeholder="Wilaya"
            title="Wilaya"
            name="wilaya_bureau"
            setValue={setWilaya}
            formik={formik}
            width={mobile ? 300 : 192}
            options={wilayaOptions}
            wilaya
            setWilayaId={setWilayaID}
            disabled={disabled}
          />
          <FormSelect
            placeholder="Commune"
            title="Commune"
            name="commune_bureau"
            setValue={setCommune}
            formik={formik}
            width={mobile ? 300 : 192}
            options={communeOptions}
            disabled={disabled}
            commune
          />
        </div>
        <div className="flex justify-center items-center mt-3">
          <FormInput
            type="text"
            name="adresse_bureau"
            placeholder="adresse"
            size={mobile ? "" : "large"}
            onChange={handleChange}
            disabled={disabled}
          />
        </div>
      </RadioGroup>
    </FormControl>
  );
}
export default AdresseSelect;
