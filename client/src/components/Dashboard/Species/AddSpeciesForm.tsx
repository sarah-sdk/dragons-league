import {
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  useState,
} from "react";
import InputField from "../../Form/InputField";

export default function AddSpeciesForm() {
  const [specie, setSpecie] = useState("");
  const [strength, setStrength] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [stamina, setStamina] = useState(0);
  const [babyImage, setBabyImage] = useState<File | null>(null);
  const [babyPreview, setBabyPreview] = useState("");
  const [adultImage, setAdultImage] = useState<File | null>(null);
  const [adultPreview, setAdultPreview] = useState("");
  const [errors, setErrors] = useState("");

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    setFile: Dispatch<React.SetStateAction<File | null>>,
    setPreview: Dispatch<React.SetStateAction<string>>,
  ) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    console.info("on rentre dans le handleSubmit");
    event.preventDefault();

    if (
      !specie ||
      !strength ||
      !speed ||
      !stamina ||
      !babyImage ||
      !adultImage
    ) {
      setErrors("Veuillez remplir les champs requis.");
      console.info(specie, strength, speed, stamina, babyImage, adultImage);
      return;
    }

    const formData = new FormData();
    formData.append("specie", specie);
    formData.append("base_strength", strength.toString());
    formData.append("base_speed", speed.toString());
    formData.append("base_stamina", stamina.toString());
    if (babyImage) formData.append("babyImage", babyImage);
    if (adultImage) formData.append("adultImage", adultImage);

    formData.forEach((value, key) => {
      console.info(key, value);
    });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/species`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        },
      );

      const data = await response.json();
      console.info("response :", response);
      if (response.ok) {
        console.info("Donnés envoyées au back !");
        window.location.reload();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setErrors((error as Error).message);
    }
  };

  return (
    <>
      {errors && <p>{errors}</p>}
      <form onSubmit={handleSubmit}>
        <InputField
          label="Nouvelle espèce"
          type="text"
          name="specie"
          value={specie}
          onChange={(e) => setSpecie(e.target.value)}
        />

        <InputField
          label="Force de base"
          type="number"
          name="base-strength"
          value={strength}
          onChange={(e) => {
            let newValue = Number(e.target.value);
            if (newValue > 10) newValue = 10;
            if (newValue < 0) newValue = 0;
            setStrength(newValue);
          }}
        />

        <InputField
          label="Vitesse de base"
          type="number"
          name="base-speed"
          value={speed}
          onChange={(e) => {
            let newValue = Number(e.target.value);
            if (newValue > 10) newValue = 10;
            if (newValue < 0) newValue = 0;
            setSpeed(newValue);
          }}
        />

        <InputField
          label="Endurance de base"
          type="number"
          name="base-stamina"
          value={stamina}
          onChange={(e) => {
            let newValue = Number(e.target.value);
            if (newValue > 10) newValue = 10;
            if (newValue < 0) newValue = 0;
            setStamina(newValue);
          }}
        />

        <InputField
          label="Image version bébé"
          type="file"
          name="baby-image"
          accept="image/*"
          onChange={(event) =>
            handleFileChange(event, setBabyImage, setBabyPreview)
          }
        />
        {babyPreview && <img src={babyPreview} alt={`baby ${specie}`} />}

        <InputField
          label="Image version adulte"
          type="file"
          name="adult-image"
          accept="image/*"
          onChange={(event) =>
            handleFileChange(event, setAdultImage, setAdultPreview)
          }
        />
        {adultPreview && <img src={adultPreview} alt={`adult ${specie}`} />}

        <button type="submit" onClick={() => console.info("bouton cliquée")}>
          +
        </button>
      </form>
    </>
  );
}
