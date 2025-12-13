import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liturgy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './liturgy.html',
  styleUrls: ['./liturgy.css']
})
export class Liturgy {
  // Track whether Matins table is open
  matinsOpen = false;

  // Matins table data
  matinsTable = [
    {
      churchSlavic: "Молитвами святых отцев наших, Господи Иисусе Христе, Боже наш, помилуй нас, аминь.",
      english: "By the prayers of our holy fathers, O Lord Jesus Christ, our God, have mercy on us. Amen."
    },
    {
      churchSlavic: "Слава Тебе, Боже наш, слава Тебе.",
      english: "Glory to You, our God, glory to You."
    },
    {
      churchSlavic: "Царю Небесный, Утешитель, Дух Истины, вездесущий и вся исполняющий, Сокровище благ и жизни, приди и вселися в ны, и очисти ны от всякой скверны, и спаси души наша.",
      english: "King of Heaven, Comforter, Spirit of Truth, everywhere present and filling all things, Treasury of blessings and life, come and dwell in us, and cleanse us from every impurity, and save our souls, O Good One."
    },
    {
      churchSlavic: "Святый Боже, Святый Крепкий, Святый Безсмертный, помилуй нас. (3 раза)",
      english: "Holy God, Holy Mighty, Holy Immortal, have mercy on us. (3 times)"
    },
    {
      churchSlavic: "Слава Отцу и Сыну и Святому Духу, и ныне и присно и во веки веков. Аминь.",
      english: "Glory to the Father and to the Son and to the Holy Spirit, now and ever and unto ages of ages. Amen."
    },
    {
      churchSlavic: "Пресвятая Троица, помилуй нас; Господи, милуй нас; Господи, очисти грехи наша; Владыко, прости беззакония наша; Святой, посети и исцели немощи наша, имени Твоего ради.",
      english: "Holy Trinity, have mercy on us; Lord, have mercy on us; Lord, cleanse our sins; Master, forgive our iniquities; Holy One, visit and heal our infirmities, for the sake of Your Name."
    },
    {
      churchSlavic: "Господи, помилуй (3 раза).",
      english: "Lord, have mercy (3 times)."
    },
    {
      churchSlavic: "Слава Отцу и Сыну и Святому Духу, и ныне и присно и во веки веков. Аминь.",
      english: "Glory to the Father, and to the Son, and to the Holy Spirit, now and ever and unto ages of ages. Amen."
    },
    {
      churchSlavic: "Отче наш, Иже еси на Небесех, да святится имя Твое, да приидет Царствие Твое, да будет воля Твоя яко на Небеси и на земли. Хлеб наш насущный даждь нам днесь; и остави нам долги наша, якоже и мы оставляем должником нашим; и не введи нас во искушение, но избави нас от лукаваго.",
      english: "Our Father, Who art in heaven, hallowed be Thy Name; Thy Kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our debts, as we forgive our debtors; and lead us not into temptation, but deliver us from evil."
    },
    {
      churchSlavic: "Слава в вышних Богу, и на земли мир, в человецех благоволение (3 раза).",
      english: "Glory to God in the highest, and on earth peace, goodwill among men (3 times)."
    },
    {
      churchSlavic: "Господи, уста мои отвѣрзеши, и уста моя возвѣстят хвалу Твою (2 раза).",
      english: "Lord, open my lips, and my mouth shall declare Your praise (2 times)."
    },
    {
      churchSlavic: "Псалом 3: Господи, что ся умножиша стужащии ми? Мнози востают на мя, мнози глаголют души моей: несть спасения ему в Бозе его. Ты же, Господи, Заступник мой еси, слава моя и возносяй главу мою. Гласом моим ко Господу воззвах, и услышал мя от горы святыя Своея. Аз уснух, и спах, востах, яко Господь застуπит мя. Не убоюся от тем людей, окрест нападающих на мя. Воскресни, Господи, спаси мя, Боже мой, яко Ты поразил еси вся враждущия ми всуе: зубы грешников сокрушил еси. Господне есть спасение, и на людех Твоих благословение Твое.",
      english: "Psalm 3: Lord, why have those who trouble me increased? Many rise against me, many speak against my soul: there is no salvation for him in his God. But You, O Lord, are my Protector, my glory and the lifter of my head. I cried to the Lord with my voice, and He heard me from His holy hill. I lay down and slept; I arose, for the Lord sustains me. I will not fear the multitude of people surrounding me. Arise, O Lord, save me, my God, for You have struck all my enemies; You have broken the teeth of the wicked. Salvation belongs to the Lord, and Your blessing is upon Your people."
    },
    {
      churchSlavic: "Псалом 37: Господи, да не яростию Твоею обличиши мене, ниже гневом Твоим наказеши мене. Яко стрелы Твоя унзоша во мне, и утвердил еси на мне руку Твою. Несть исцеления в плоти моея от лица гнева Твоего, несть мира в костех моих от лица грех моих. Яко беззакония моя превзидоша главу мою, яко бремя тяжкое отяготеше на мне. Возсмердеща и согниша раны моя от лица безумия моего. Пострадах и слякохся до конца, весь день сетуя ходждах. Яко лядвия моя наполнишася поруганий, и несть исцеления в плоти моея. Озлоблен бых и смирихся до зела, рыках от воздыхания сердца моего. Господи, пред Тобою все желание мое и воздыхание мое от Тебе не утаися. Сердце мое смятеся, остави мя сила моя, и свет очию моею, и той несть со мною.",
      english: "Psalm 37: Lord, do not rebuke me in Your anger, nor discipline me in Your wrath. Your arrows have pierced me, and Your hand has been upon me. There is no healing in my flesh from Your wrath, no peace in my bones because of my sins. My iniquities have gone over my head; they weigh heavily upon me. My wounds fester and decay from my folly. I have suffered and am exhausted to the end; all day I walk in sorrow. My loins are filled with reproach, and there is no healing in my flesh. I am troubled and humbled to the utmost, groaning from the sighing of my heart. Lord, all my desire is before You, and my sighing is not hidden from You. My heart is dismayed; leave me not, O my strength, and the light of my eyes; they are not with me."
    },
    {
      churchSlavic: "Псалом 62: Боже, Боже мой, к Тебе утренюю, возжада Тебе душа моя, коль мнози Тебе плоть моя, в земли пусте и непроходне, и безводне. Тако во святем явился Тебе, видети силу Твою и славу Твою. Яко лучши милость Твоя паче живот, устне мои похвалите Тя. Тако благословлю Тя в животе моем, о имени Твоем воздержу руки мои. Яко от тука и масти да исполнися душа моя, и устана радости восхвалят Тя уста моя. Аще поминах Тя на постели моей, на утренних поучахся в Тя. Яко был еси Помощник мой, и в криве крилу Твоею возрадуюся. Прильпе душа моя по Тебе, мене же прията десница Твоя. Тии же всуе искаша душу мою, внидут в преисподняя земли, предадятся в руки оружия.",
      english: "Psalm 62: God, my God, to You in the morning my soul longs; my flesh thirsts for You in a barren and dry land without water. So I have appeared before You in holiness, to see Your power and Your glory. For Your lovingkindness is better than life; my lips shall praise You. So I will bless You in my life; I will lift up my hands in Your Name. As my soul longs and thirsts, my lips shall exalt You with joy. If I remember You on my bed, I meditate on You in the morning. For You have been my Helper, and I will rejoice in the shadow of Your wings. My soul clings to You; Your right hand will hold me. Those seeking my soul in vain will descend into the depths of the earth and fall into the hands of weapons."
    },
    {
      churchSlavic: "Слава Отцу и Сыну и Святому Духу, и ныне и присно и во веки веков, аминь.",
      english: "Glory to the Father, and to the Son, and to the Holy Spirit, now and ever and unto ages of ages, Amen."
    },
    {
      churchSlavic: "Аллилуиа, аллилуиа, аллилуиа",
      english: "Alleluia, alleluia, alleluia"
    },
    {
      churchSlavic: "Слава Тебе Боже (3 раза).",
      english: "Glory to You, O God (3 times)."
    },
    {
      churchSlavic: "Господи, помилуй (3 раза)",
      english: "Lord, have mercy (3 times)."
    },
    {
      churchSlavic: "Слава Отцу и Сыну и Святому Духу, и ныне и присно и во веки веков, аминь.",
      english: "Glory to the Father, and to the Son, and to the Holy Spirit, now and ever and unto ages of ages, Amen."
    }

];

  // Toggle collapsible
  toggleMatins() {
    this.matinsOpen = !this.matinsOpen;
  }
}
