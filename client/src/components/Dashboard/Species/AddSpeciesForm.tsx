import { type FormEvent, useState } from "react";
import InputField from "../../Form/InputField";

export default function AddSpeciesForm() {
  const [specie, setSpecie] = useState("");
  const [strength, setStrength] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [stamina, setStamina] = useState(0);
  const [babyImage, setBabyImage] = useState<File | null>(null);
  const [adultImage, setAdultImage] = useState<File | null>(null);
  const [errors, setErrors] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!specie || !strength || !speed || !stamina || babyImage || adultImage) {
      setErrors("Veuillez remplir les champs requis.");
      return;
    }

    const newSpecie = {
      specie: specie,
      base_strength: strength,
      base_speed: speed,
      base_stamina: stamina,
      url_baby: babyImage,
      url_adult: adultImage,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/species`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(newSpecie),
          credentials: "include",
        },
      );

      const data = await response.json();
      if (response.ok) {
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
          name="base-speed"
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
          name="babyImage"
          accept="image/*"
          onChange={(e) => setBabyImage(e.target.files?.[0] || null)}
        />

        <InputField
          label="Image version adulte"
          type="file"
          name="adultImage"
          accept="image/*"
          onChange={(e) => setAdultImage(e.target.files?.[0] || null)}
        />

        <button type="submit">+</button>
      </form>
    </>
  );
}
