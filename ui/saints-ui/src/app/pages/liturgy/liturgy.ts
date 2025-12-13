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
      churchSlavic: "Аллилуиа, аллилуиа, аллилуиа, Слава Тебе Боже (3 раза).",
      english: "Alleluia, alleluia, alleluia, Glory to You, O God (3 times)."
    },
    {
      churchSlavic: "Господи, помилуй (3 раза)",
      english: "Lord, have mercy (3 times)."
    },
    {
      churchSlavic: "Слава Отцу и Сыну и Святому Духу, и ныне и присно и во веки веков, аминь.",
      english: "Glory to the Father, and to the Son, and to the Holy Spirit, now and ever and unto ages of ages, Amen."
    },
    {
      churchSlavic: "Псалом 87: Господи Боже спасения моего, во дни воззвах и в нощи пред Тобою. Да внидет пред Тя молитва моя; приклони ухо Твое к молению моему. Яко исполнися зол душа моя, и живот мой аду приближися. Привменен бых с низходящими в ров, бых яко человек без помощи, в мертвых свободь, яко язвеннии спящии во гробе, ихже не помянул еси ктому, и тии от руки Твоея отриновени быша. Положиша мя в рове преисподнем, в темных и сени смертней. На мне утвердися ярость Твоя, и вся волны Твоя навел еси на мя. Удалил еси знаемых моих от мене, положиша мя мерзость себе; предан бых и не исхождах. Очи мои изнемогосте от нищеты; воззвах к Тебе, Господи, весь день, воздех к Тебе руце мои. Еда мертвыми твориши чудеса? Или врачеве воскресат и исповедятся Тебе? Еда повесть кто во гробе милость Твою и истину Твою в погибели? Еда познана будут во тьме чудеса Твоя, и правда Твоя в земли забвенней? И аз к Тебе, Господи, воззвах, и утро молитва моя предварит Тя. Вскую, Господи, отрееши душу мою, отвращаеши лице Твое от мене? Нищ есмь аз и в трудех от юности моея; вознес же ся, смирихся и изнемогох. На мне преидоша гневи Твои, устрашения Твоя возмутиша мя; обыдоша мя яко вода весь день, одержаша мя вку́пе. Удалил еси от мене друга и искренняго, и знаемых моих от страстей.",
      english: "Psalm 87: O Lord God of my salvation, I have cried by day and by night before You. Let my prayer come before You; incline Your ear to my supplication. For my soul is full of troubles, and my life draws near to Hades. I am counted with those who go down into the pit; I am like a man without help, free among the dead, like the slain who sleep in the grave, whom You remember no more, and who are cut off from Your hand. They have laid me in the lowest pit, in darkness and in the shadow of death. Your wrath lies heavy upon me, and You have brought all Your waves upon me. You have put my acquaintances far from me; they have made me an abomination to themselves; I am shut up and cannot escape. My eye wastes away because of affliction; I have cried to You, O Lord, all the day long; I have stretched out my hands to You. Will You work wonders for the dead? Or shall physicians raise them up, that they may praise You? Shall Your mercy be declared in the grave, or Your truth in destruction? Shall Your wonders be known in the dark, and Your righteousness in the land of forgetfulness? But to You, O Lord, I have cried, and in the morning my prayer shall come before You. Why, O Lord, do You cast off my soul? Why do You hide Your face from me? I am poor and in troubles from my youth; having been exalted, I was humbled and brought low. Your fierce wrath has gone over me; Your terrors have destroyed me. They came around me like water all day long; they engulfed me altogether. You have put far from me friend and neighbor, and my acquaintances because of my afflictions."
    },
    {
      churchSlavic: "Псалом 102: Благослови, душе моя, Господа, и вся внутренняя моя имя святое Его. Благослови, душе моя, Господа, и не забывай всех воздаяний Его: очищающаго вся беззакония твоя, исцеляющаго вся недуги твоя, избавляющаго от истления живот твой, венчающаго тя милостию и щедротами, исполняющаго во благих желание твое; обновится яко орля юность твоя. Творяй милостыни Господь и судьбу всем обидимым. Сказа пути Своя Моисеови, сыновом Израилевым хотения Своя. Щедр и Милостив Господь, Долготерпелив и Многомилостив. Не до конца прогневается, ниже во век враждует. Не по беззаконием нашим сотворил есть нам, ниже по грехом нашим воздал есть нам. Яко по высоте небесней от земли, утвердил есть Господь милость Свою на боящихся Его. Елико отстоят восток от запад, удалил есть от нас беззакония наша. Якоже щедрит отец сыны, ущедри Господь боящихся Его. Яко Той позна создание наше, помяну, яко персть есмы. Человек, яко трава дние его, яко цвет сельный, тако оцветет; яко дух пройде в нем, и не будет, и не познает ктому места своего. Милость же Господня от века и до века на боящихся Его, и правда Его на сынех сынов, хранящих завет Его, и помнящих заповеди Его творити я. Господь на Небеси уготова Престол Свой, и Царство Его всеми обладает. Благословите Господа вси Ангели Его, сильнии крепостию, творящии слово Его, услышати глас словес Его. Благословите Господа вся Силы Его, слуги Его, творящии волю Его. Благословите Господа вся дела Его, на всяком месте владычества Его; благослови, душе моя, Господа.",
      english: "Psalm 102: Bless the Lord, O my soul, and all that is within me bless His holy Name. Bless the Lord, O my soul, and forget not all His benefits: Who forgives all your iniquities, Who heals all your diseases, Who redeems your life from corruption, Who crowns you with mercy and compassion, Who satisfies your desire with good things; your youth shall be renewed like the eagle’s. The Lord performs deeds of mercy and justice for all who are wronged. He made known His ways to Moses, His desires to the children of Israel. The Lord is compassionate and merciful, slow to anger and abounding in mercy. He will not always be angry, nor will He keep His wrath forever. He has not dealt with us according to our sins, nor rewarded us according to our iniquities. For as high as the heavens are above the earth, so great is His mercy toward those who fear Him. As far as the east is from the west, so far has He removed our iniquities from us. As a father has compassion on his children, so the Lord has compassion on those who fear Him; for He knows our frame; He remembers that we are dust. As for man, his days are like grass; as a flower of the field, so he flourishes. The wind passes over it, and it is gone, and its place remembers it no more. But the mercy of the Lord is from everlasting to everlasting upon those who fear Him, and His righteousness to children’s children, to those who keep His covenant and remember His commandments to do them. The Lord has prepared His throne in heaven, and His kingdom rules over all. Bless the Lord, all you His angels, mighty in strength, who do His word, heeding the voice of His word. Bless the Lord, all His hosts, His ministers who do His will. Bless the Lord, all His works, in every place of His dominion. Bless the Lord, O my soul."
    },
    {
      churchSlavic: "Псалом 142: Господи, услыши молитву мою, внуши моление мое во истине Твоей, услыши мя в правде Твоей и не вниди в суд с рабом Твоим, яко не оправдится пред Тобою всяк живый. Яко погна враг душу мою, смирил есть в землю живот мой, посадил мя есть в темных, яко мертвыя века. И уны во мне дух мой, во мне смятеся сердце мое. Помянух дни древния, поучихся во всех делех Твоих, в творениих руку Твоею поучахся. Воздех к Тебе руце мои, душа моя яко земля безводная Тебе. Скоро услыши мя, Господи, исчезе дух мой; не отврати лица Твоего от мене, и уподоблюся низходящим в ров. Слышану сотвори мне заутра милость Твою, яко на Тя уповах. Скажи ми, Господи, путь, воньже пойду, яко к Тебе взях душу мою. Изми мя от враг моих, Господи, к Тебе прибегох. Научи мя творити волю Твою, яко Ты еси Бог мой. Дух Твой Благий наставит мя на землю праву. Имене Твоего ради, Господи, живиши мя; правдою Твоею изведеши от печали душу мою. И милостию Твоею потребиши враги моя и погубиши вся стужающыя души моея, яко аз раб Твой есмь.",
      english: "Psalm 142: O Lord, hear my prayer, give ear to my supplication in Your truth; hear me in Your righteousness, and enter not into judgment with Your servant, for in Your sight no one living shall be justified. For the enemy has pursued my soul; he has humbled my life to the ground; he has made me dwell in darkness like those long dead. Therefore my spirit is overwhelmed within me; my heart within me is distressed. I remember the days of old; I meditate on all Your works; I muse on the works of Your hands. I stretch out my hands to You; my soul thirsts for You like a dry land. Hear me quickly, O Lord; my spirit fails. Do not turn Your face away from me, lest I be like those who go down into the pit. Cause me to hear Your mercy in the morning, for in You do I trust. Make known to me the way in which I should walk, for I lift up my soul to You. Deliver me from my enemies, O Lord; to You I flee for refuge. Teach me to do Your will, for You are my God. Your good Spirit shall lead me on level ground. For Your Name’s sake, O Lord, give me life; in Your righteousness bring my soul out of trouble. In Your mercy destroy my enemies, and cut off all those who afflict my soul, for I am Your servant."
    },
    {
      churchSlavic: `Сла́ва Отцу́ и Сы́ну и Свято́му Ду́ху, и ны́не и при́сно и во ве́ки веко́в, ами́нь.`,
      english: `Glory to the Father, and to the Son, and to the Holy Spirit, now and ever and unto ages of ages. Amen.`
    },
    {
      churchSlavic: `Аллилу́иа, аллилу́иа, аллилу́иа, сла́ва Тебе́ Бо́же. (3 раза)`,
      english: `Alleluia, alleluia, alleluia, glory to You, O God. (3 times)`
    },
    {
      churchSlavic: `Бог Госпо́дь, и яви́ся нам, благослове́н Гряды́й во И́мя Госпо́дне.`,
      english: `God is the Lord and He has revealed Himself to us; blessed is He who comes in the name of the Lord.`
    },
    {
      churchSlavic: `Стих: Испове́дайтеся Го́сподеви, я́ко благ, я́ко в век ми́лость Его́.`,
      english: `Verse: Give thanks to the Lord, for He is good, for His mercy endures forever.`
    },
    {
      churchSlavic: `Бог Госпо́дь, и яви́ся нам, благослове́н Гряды́й во И́мя Госпо́дне.`,
      english: `God is the Lord and He has revealed Himself to us; blessed is He who comes in the name of the Lord.`
    },
    {
      churchSlavic: `Стих: Обыше́дше обыдо́ша мя, и и́менем Госпо́дним противля́хся им.`,
      english: `Verse: Surrounding me they encompassed me, but in the name of the Lord I resisted them.`
    },
    {
      churchSlavic: `Бог Госпо́дь, и яви́ся нам, благослове́н Гряды́й во И́мя Госпо́дне.`,
      english: `God is the Lord and He has revealed Himself to us; blessed is He who comes in the name of the Lord.`
    },
    {
      churchSlavic: `Стих: Не умру́, но жив бу́ду, и пове́м дела́ Госпо́дня.`,
      english: `Verse: I shall not die, but live, and I shall proclaim the works of the Lord.`
    },
    {
      churchSlavic: `Бог Госпо́дь, и яви́ся нам, благослове́н Гряды́й во И́мя Госпо́дне.`,
      english: `God is the Lord and He has revealed Himself to us; blessed is He who comes in the name of the Lord.`
    },
    {
      churchSlavic: `Стих: Ка́мень, Его́же небрего́ша зи́ждущии, Сей бысть во главу́ угла́; от Го́спода бысть Сей, и есть ди́вен во очесе́х на́ших.`,
      english: `Verse: The stone which the builders rejected has become the cornerstone; this is the Lord’s doing, and it is marvelous in our eyes.`
    },
    {
      churchSlavic: `Бог Госпо́дь, и яви́ся нам, благослове́н Гряды́й во И́мя Госпо́дне.`,
      english: `God is the Lord and He has revealed Himself to us; blessed is He who comes in the name of the Lord.`
    }
];

  // Toggle collapsible
  toggleMatins() {
    this.matinsOpen = !this.matinsOpen;
  }
}
