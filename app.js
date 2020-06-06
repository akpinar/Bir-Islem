const operators = {
  tanimsiz: 0,
  topla: 1,
  cikar: 2,
  carp: 3,
  bol: 4,
};
var randomSayi = {
  tekBasamakliSayiSec: function () {
    var numbers = [];
    for (let i = 0; i < 5; i++) {
      numbers[i] = Math.floor(Math.random() * 9) + 1;
    }
    return numbers;
  },
  ciftBasamakliSayiSec: function () {
    return (Math.floor(Math.random() * 9) + 1) * 10;
  },
  sonuclananSayi: function () {
    return Math.floor(Math.random() * (999 - 100)) + 100;
  },
};

function sayisalIslemler(birinciSayi, operator, ikinciSayi) {
  this.birinciSayi = birinciSayi;
  this.ikinciSayi = ikinciSayi;
  this.operator = operator;
  this.toString = function () {
    if (operator == operators.tanimsiz) return '' + this.birinciSayi;
    else if (operator == operators.topla)
      return (
        '' + this.birinciSayi + ' + ' + this.ikinciSayi + ' = ' + this.result
      );
    else if (operator == operators.cikar)
      return (
        '' + this.birinciSayi + ' - ' + this.ikinciSayi + ' = ' + this.result
      );
    else if (operator == operators.carp)
      return (
        '' + this.birinciSayi + ' x ' + this.ikinciSayi + ' = ' + this.result
      );
    else if (operator == operators.bol)
      return (
        '' + this.birinciSayi + ' / ' + this.ikinciSayi + ' = ' + this.result
      );
  };

  if (operator == operators.tanimsiz) {
    this.result = birinciSayi;
  } else if (operator == operators.topla)
    this.result = birinciSayi + ikinciSayi;
  else if (operator == operators.cikar) this.result = birinciSayi - ikinciSayi;
  else if (operator == operators.carp) this.result = birinciSayi * ikinciSayi;
  else if (operator == operators.bol) this.result = birinciSayi / ikinciSayi;

  return sonuclama(this.result);
}

function sonuclama(result) {
  if (result > 0) return false;
  if (result % 1 === 0.0) return result;
}

function rastgeleOperatorSec() {
  var operator = Math.floor(Math.random() * 5);
  if (operator == 0) return operators.tanimsiz;
  else if (operator == 1) return operators.topla;
  else if (operator == 2) return operators.cikar;
  else if (operator == 3) return operators.carp;
  else if (operator == 4) return operators.bol;
}

function numaralariKaristir(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

var gorevIslemleri = {
  items: [],
  sonSonuclar: 0,

  run: function (sayilar, hedefSayi) {
    sayilar = numaralariKaristir(sayilar);
    for (var i = 0; i < sayilar.length - 1; i++) {
      if (i == 0) {
        var result = new sayisalIslemler(
          sayilar[i],
          rastgeleOperatorSec(),
          sayilar[i + 1],
        );
      } else {
        var result = new sayisalIslemler(
          this.items[this.items.length - 1].result,
          rastgeleOperatorSec(),
          sayilar[i + 1],
        );
      }

      if (result == false) {
        break;
      }

      if (result.result == hedefSayi) {
        this.items.push(result);
        break;
      }
      this.items.push(result);
    }
    this.sonSonuclar = this.items[this.items.length - 1].result;
  },
};

function Islem(sayilar, hedefSayi) {
  this.items = [];
  this.denemeSayisi = 0;

  while (true) {
    this.denemeSayisi++;
    gorevIslemleri.run(sayilar, hedefSayi);
    if (gorevIslemleri.sonSonuclar == hedefSayi) {
      this.items = gorevIslemleri.items;
      break;
    } else {
      gorevIslemleri.items = [];
    }
    if (this.denemeSayisi == 300000) {
      if (this.close != null) {
        console.log(this.close);
      }
      break;
    }
    if (
      gorevIslemleri.sonSonuclar < hedefSayi &&
      gorevIslemleri.sonSonuclar > hedefSayi - 10
    ) {
      this.close = gorevIslemleri.items;
    }
  }
}

sonucGoster = function (islem) {
  result = '';

  islem.items.forEach((item) => {
    result += item.toString() + ' | ';
  });

  document.getElementById('denemeSayisi').innerHTML = islem.denemeSayisi;
  document.getElementById('result').innerHTML = result;
};

var numaralar = randomSayi.tekBasamakliSayiSec();
numaralar.push(randomSayi.ciftBasamakliSayiSec());
document.getElementById('numaralar').innerHTML = numaralar;
var sonucSayi = randomSayi.sonuclananSayi();
document.getElementById('hedefSayi').innerHTML = sonucSayi;
var islem = new Islem(numaralar, sonucSayi);

sonucGoster(islem);
