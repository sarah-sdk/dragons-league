import AbstractSeeder from "./AbstractSeeder";

class SpecieSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "specie", truncate: true });
  }

  run() {
    const species = [
      {
        specie: "braseroc",
        base_strength: 8,
        base_speed: 7,
        base_stamina: 6,
        url_baby: "assets/images/dragons/braseroc_bebe.jpeg",
        url_adult: "assets/images/dragons/braseroc_adulte.jpeg",
      },
      {
        specie: "ourazur",
        base_strength: 6,
        base_speed: 10,
        base_stamina: 7,
        url_baby: "assets/images/dragons/ourazur_bebe.jpeg",
        url_adult: "assets/images/dragons/ourazur_adulte.jpeg",
      },
      {
        specie: "givrelame",
        base_strength: 7,
        base_speed: 8,
        base_stamina: 6,
        url_baby: "assets/images/dragons/givrelame_bebe.jpeg",
        url_adult: "assets/images/dragons/givrelame_adulte.jpeg",
      },
      {
        specie: "tellurion",
        base_strength: 9,
        base_speed: 5,
        base_stamina: 9,
        url_baby: "assets/images/dragons/tellurion_bebe.jpeg",
        url_adult: "assets/images/dragons/tellurion_adulte.jpeg",
      },
      {
        specie: "ombrefeu",
        base_strength: 8,
        base_speed: 9,
        base_stamina: 5,
        url_baby: "assets/images/dragons/ombrefeu_bebe.jpeg",
        url_adult: "assets/images/dragons/ombrefeu_adulte.jpeg",
      },
    ];

    for (let i = 0; i < species.length; i++) {
      this.insert(species[i]);
    }
  }
}

export default SpecieSeeder;
