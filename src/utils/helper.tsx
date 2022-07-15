import colors from '../theme/colors';

export default class Helper {
  static getTypesColor(type: string) {
    switch (type) {
      case 'grass':
        return colors.grass;
      case 'normal':
        return colors.normal;
      case 'fighting':
        return colors.fighting;
      case 'flying':
        return colors.flying;
      case 'poison':
        return colors.poison;
      case 'ground':
        return colors.ground;
      case 'rock':
        return colors.rock;
      case 'bug':
        return colors.bug;
      case 'ghost':
        return colors.ghost;
      case 'steel':
        return colors.steel;
      case 'fire':
        return colors.fire;
      case 'water':
        return colors.water;
      case 'electric':
        return colors.electric;
      case 'psychic':
        return colors.psychic;
      case 'ice':
        return colors.ice;
      case 'dragon':
        return colors.dragon;
      case 'dark':
        return colors.dark;
      case 'fairy':
        return colors.fairy;
      case 'shadow':
        return colors.shadow;
      default:
        return colors.unknown;
    }
  }

  static getTypesBGColor(type: string) {
    switch (type) {
      case 'grass':
        return colors.grassBG;
      case 'normal':
        return colors.normalBG;
      case 'fighting':
        return colors.fightingBG;
      case 'flying':
        return colors.flyingBG;
      case 'poison':
        return colors.poisonBG;
      case 'ground':
        return colors.groundBG;
      case 'rock':
        return colors.rockBG;
      case 'bug':
        return colors.bugBG;
      case 'ghost':
        return colors.ghostBG;
      case 'steel':
        return colors.steelBG;
      case 'fire':
        return colors.fireBG;
      case 'water':
        return colors.waterBG;
      case 'electric':
        return colors.electricBG;
      case 'psychic':
        return colors.psychicBG;
      case 'ice':
        return colors.iceBG;
      case 'dragon':
        return colors.dragonBG;
      case 'dark':
        return colors.darkBG;
      case 'fairy':
        return colors.fairyBG;
      case 'shadow':
        return colors.shadowBG;
      default:
        return colors.unknownBG;
    }
  }
  static getStatColor(stat: string) {
    switch (stat) {
      case 'hp':
        return colors.fire;
      case 'attack':
        return colors.ground;
      case 'defense':
        return colors.electricBG;
      case 'special-attack':
        return colors.waterBG;
      case 'special-defense':
        return colors.bug;
      case 'speed':
        return colors.normal;
      default:
        return colors.fire;
    }
  }
  static getStatName(stat: string) {
    switch (stat) {
      case 'hp':
        return 'Hp';
      case 'attack':
        return 'Atk';
      case 'defense':
        return 'Def';
      case 'special-attack':
        return 'SP.Atk';
      case 'special-defense':
        return 'SP.Def';
      case 'speed':
        return 'Spd';
      default:
        return colors.fire;
    }
  }
}
