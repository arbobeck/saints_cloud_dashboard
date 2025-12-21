import { Component } from '@angular/core';


@Component({
  selector: 'app-liturgy',
  standalone: true,
  imports: [],
  templateUrl: './liturgy.html',
  styleUrls: ['./liturgy.css']
})
export class Liturgy {
  // Track whether Matins table is open
  matinsOpen = false;

  // Matins table data
matinsTable = [
  {
    churchSlavic: "Моли́твами святы́х отце́в на́ших, Го́споди Иису́се Христе́, Бо́же наш, поми́луй нас, ами́нь.",
    english: "By the prayers of our holy fathers, O Lord Jesus Christ, our God, have mercy on us. Amen."
  },
  {
    churchSlavic: "Сла́ва Тебе́, Бо́же наш, сла́ва Тебе́.",
    english: "Glory to You, our God, glory to You."
  },
  {
    churchSlavic: "Царю́ Небе́сный, Уте́шителю, Ду́ше И́стины, И́же везде́ сый и вся исполня́яй, Сокро́вище благи́х и жи́зни Пода́телю, прииди́ и всели́ся в ны, и очи́сти ны от вся́кия скве́рны, и спаси́, Бла́же, ду́ши на́ша.",
    english: "King of Heaven, Comforter, Spirit of Truth, everywhere present and filling all things, Treasury of blessings and Giver of life, come and dwell in us, and cleanse us from every impurity, and save our souls, O Good One."
  },
  {
    churchSlavic: "Святы́й Бо́же, Святы́й Кре́пкий, Святы́й Безсме́ртный, поми́луй нас. (3 ра́за)",
    english: "Holy God, Holy Mighty, Holy Immortal, have mercy on us. (3 times)"
  },
  {
    churchSlavic: "Сла́ва Отцу́ и Сы́ну и Свято́му Ду́ху, и ны́не и при́сно и во ве́ки веко́в. Ами́нь.",
    english: "Glory to the Father and to the Son and to the Holy Spirit, now and ever and unto ages of ages. Amen."
  },
  {
    churchSlavic: "Пресвята́я Тро́ице, поми́луй нас; Го́споди, очи́сти грехи́ на́ша; Влады́ко, прости́ беззако́ния на́ша; Святы́й, посети́ и исцели́ не́мощи на́ша, и́мене Твоего́ ра́ди.",
    english: "Holy Trinity, have mercy on us; Lord, cleanse our sins; Master, forgive our iniquities; Holy One, visit and heal our infirmities, for the sake of Your Name."
  },
  {
    churchSlavic: "Го́споди, поми́луй (3 ра́за).",
    english: "Lord, have mercy (3 times)."
  },
  {
    churchSlavic: "Сла́ва Отцу́ и Сы́ну и Свято́му Ду́ху, и ны́не и при́сно и во ве́ки веко́в. Ами́нь.",
    english: "Glory to the Father, and to the Son, and to the Holy Spirit, now and ever and unto ages of ages. Amen."
  },
  {
    churchSlavic: "О́тче наш, И́же еси́ на Небесе́х, да святи́тся и́мя Твое́, да прии́дет Ца́рствие Твое́, да бу́дет во́ля Твоя́, я́ко на Небеси́ и на земли́. Хлеб наш насу́щный даждь нам днесь; и оста́ви нам до́лги на́ша, я́коже и мы оставля́ем должнико́м на́шим; и не введи́ нас во искуше́ние, но изба́ви нас от лука́ваго.",
    english: "Our Father, Who art in heaven, hallowed be Thy Name; Thy Kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our debts, as we forgive our debtors; and lead us not into temptation, but deliver us from evil."
  },
  {
    churchSlavic: "Сла́ва в вы́шних Бо́гу, и на земли́ мир, в челове́цех благоволе́ние (3 ра́за).",
    english: "Glory to God in the highest, and on earth peace, goodwill among men (3 times)."
  },
  {
    churchSlavic: "Го́споди, устне́ мои́ отве́рзеши, и уста́ моя́ возвестя́т хвалу́ Твою́ (2 ра́за).",
    english: "Lord, open my lips, and my mouth shall declare Your praise (2 times)."
  },
  {
    churchSlavic: "Псало́м 3: Го́споди, что ся умно́жиша стужа́ющии ми? Мно́зи востаю́т на мя, мно́зи глаго́лют души́ мое́й: несть спасе́ния ему́ в Бо́зе его́. Ты же, Го́споди, Засту́пник мой еси́, сла́ва моя́ и возНося́й главу́ мою́. Гла́сом мои́м ко Го́споду воззва́х, и услы́ша мя от горы́ святы́я Своея́. Аз усну́х, и спах, воста́х, я́ко Госпо́дь засту́пит мя. Не убою́ся от тем люде́й, о́крест напада́ющих на мя. Воскресни́, Го́споди, спаси́ мя, Бо́же мой, я́ко Ты порази́л еси́ вся вражду́ющия ми всу́е: зу́бы гре́шников сокруши́л еси́. Госпо́дне есть спасе́ние, и на лю́дех Твои́х благослове́ние Твое́.",
    english: "Psalm 3: Lord, why have those who trouble me increased? Many rise against me, many speak against my soul: there is no salvation for him in his God. But You, O Lord, are my Protector, my glory and the lifter of my head. I cried to the Lord with my voice, and He heard me from His holy hill. I lay down and slept; I arose, for the Lord sustains me. I will not fear the multitude of people surrounding me. Arise, O Lord, save me, my God, for You have struck all my enemies; You have broken the teeth of the wicked. Salvation belongs to the Lord, and Your blessing is upon Your people."
  },
  {
    churchSlavic: "Псало́м 37: Го́споди, да не я́ростию Твое́ю обличи́ши мене́, ниже́ гне́вом Твои́м нака́жеши мене́. Я́ко стре́лы Твоя́ унзо́ша во мне, и утверди́л еси́ на мне ру́ку Твою́. Несть исцеле́ния в пло́ти мое́й от лица́ гне́ва Твоего́, несть ми́ра в косте́х мои́х от лица́ грех мои́х. Я́ко беззако́ния моя́ превзидо́ша главу́ мою́, я́ко бре́мя тя́жкое отяготе́ша на мне. Возсмерде́ша и согни́ша ра́ны моя́ от лица́ безу́мия моего́. Пострада́х и сляко́хся до конца́, весь день се́туя хожда́х. Я́ко ля́двия моя́ напо́лнишася поруга́ний, и несть исцеле́ния в пло́ти мое́й. Озло́блен бых и смири́хся до зела́, рыка́х от воздыха́ния се́рдца моего́. Го́споди, пред Тобо́ю все жела́ние мое́ и воздыха́ние мое́ от Тебе́ не утаи́ся. Се́рдце мое́ смяте́ся, оста́ви мя си́ла моя́, и свет очи́ю мое́ю, и той несть со мно́ю.",
    english: "Psalm 37: Lord, do not rebuke me in Your anger, nor discipline me in Your wrath. Your arrows have pierced me, and Your hand has been upon me. There is no healing in my flesh from Your wrath, no peace in my bones because of my sins. My iniquities have gone over my head; they weigh heavily upon me. My wounds fester and decay from my folly. I have suffered and am exhausted to the end; all day I walk in sorrow. My loins are filled with reproach, and there is no healing in my flesh. I am troubled and humbled to the utmost, groaning from the sighing of my heart. Lord, all my desire is before You, and my sighing is not hidden from You. My heart is dismayed; leave me not, O my strength, and the light of my eyes; they are not with me."
  },
  {
    churchSlavic: "Псало́м 62: Бо́же, Бо́же мой, к Тебе́ у́тренюю, возжада́ Тебе́ душа́ моя́, коль мно́зи Тебе́ плоть моя́, в земли́ пу́сте и непрохо́дне, и безво́дне. Та́ко во святе́м яви́хся Тебе́, ви́дети си́лу Твою́ и сла́ву Твою́. Я́ко лу́чши ми́лость Твоя́ па́че живо́т, устне́ мои́ похва́лите Тя. Та́ко благословлю́ Тя в животе́ мое́м, о и́мени Твое́м воздежу́ ру́це мои́. Я́ко от ту́ка и ма́сти да испо́лнится душа́ моя́, и устна́ми ра́дости восхва́лят Тя уста́ моя́. А́ще помина́х Тя на посте́ли мое́й, на у́тренних поуча́хся в Тя. Я́ко был еси́ Помо́щник мой, и в кро́ве крилу́ Твое́ю возра́дуюся. Прильпе́ душа́ моя́ по Тебе́, мене́ же прия́т десни́ца Твоя́. Ти́и же всу́е иска́ша ду́шу мою́, вни́дут в преиспо́дняя земли́, преда́дятся в ру́ки ору́жия.",
    english: "Psalm 62: God, my God, to You in the morning my soul longs; my flesh thirsts for You in a barren and dry land without water. So I have appeared before You in holiness, to see Your power and Your glory. For Your lovingkindness is better than life; my lips shall praise You. So I will bless You in my life; I will lift up my hands in Your Name. As my soul longs and thirsts, my lips shall exalt You with joy. If I remember You on my bed, I meditate on You in the morning. For You have been my Helper, and I will rejoice in the shadow of Your wings. My soul clings to You; Your right hand will hold me. Those seeking my soul in vain will descend into the depths of the earth and fall into the hands of weapons."
  },
  {
    churchSlavic: "Сла́ва Отцу́ и Сы́ну и Свято́му Ду́ху, и ны́не и при́сно и во ве́ки веко́в, ами́нь.",
    english: "Glory to the Father, and to the Son, and to the Holy Spirit, now and ever and unto ages of ages, Amen."
  },
  {
    churchSlavic: "Аллилу́иа, аллилу́иа, аллилу́иа, Сла́ва Тебе́ Бо́же (3 ра́за).",
    english: "Alleluia, alleluia, alleluia, Glory to You, O God (3 times)."
  },
  {
    churchSlavic: "Го́споди, поми́луй (3 ра́за)",
    english: "Lord, have mercy (3 times)."
  },
  {
    churchSlavic: "Сла́ва Отцу́ и Сы́ну и Свято́му Ду́ху, и ны́не и при́сно и во ве́ки веко́в, ами́нь.",
    english: "Glory to the Father, and to the Son, and to the Holy Spirit, now and ever and unto ages of ages, Amen."
  },
  {
    churchSlavic: "Псало́м 87: Го́споди Бо́же спасе́ния моего́, во дни воззва́х и в нощи́ пред Тобо́ю. Да вни́дет пред Тя моли́тва моя́; приклони́ у́хо Твое́ к моле́нию моему́. Я́ко испо́лнися зол душа́ моя́, и живо́т мой а́ду прибли́жися. Привме́нен бых с низходя́щими в ров, бых я́ко челове́к без по́мощи, в ме́ртвых свобо́дь, я́ко язве́ннии спя́щии во гро́бе, и́хже не помяну́л еси́ ктому́, и ти́и от руки́ Твоея́ отринове́ни бы́ша. Положи́ша мя в ро́ве преиспо́днем, в те́мных и се́ни сме́ртней. На мне утверди́ся я́рость Твоя́, и вся во́лны Твоя́ наве́л еси́ на мя. Удали́л еси́ зна́емых мои́х от мене́, положи́ша мя ме́рзость себе́; пре́дан бых и не исхожда́х. О́чи мои́ изнемого́сте от нищеты́; воззва́х к Тебе́, Го́споди, весь день, воздео́х к Тебе́ ру́це мои́. Еда́ ме́ртвыми твори́ши чудеса́? Или́ вра́чеве воскреся́т и испове́дятся Тебе́? Еда́ пове́сть кто во гро́бе ми́лость Твою́ и и́стину Твою́ в поги́бели? Еда́ позна́на бу́дут во тьме чудеса́ Твоя́, и пра́вда Твоя́ в земли́ забве́нней? И аз к Тебе́, Го́споди, воззва́х, и у́тро моли́тва моя́ предвари́т Тя. Вску́ю, Го́споди, отре́еши ду́шу мою́, отвраща́еши лице́ Твое́ от мене́? Нищ есмь аз и в труде́х от ю́ности моея́; вознес́ же ся, смири́хся и изнемого́х. На мне преидо́ша гне́ви Твои́, устраше́ния Твоя́ возмути́ша мя; обыдо́ша мя я́ко вода́ весь день, одержа́ша мя вку́пе. Удали́л еси́ от мене́ дру́га и и́скренняго, и зна́емых мои́х от страсте́й.",
    english: "Psalm 87: O Lord God of my salvation, I have cried by day and by night before You. Let my prayer come before You; incline Your ear to my supplication. For my soul is full of troubles, and my life draws near to Hades. I am counted with those who go down into the pit; I am like a man without help, free among the dead, like the slain who sleep in the grave, whom You remember no more, and who are cut off from Your hand. They have laid me in the lowest pit, in darkness and in the shadow of death. Your wrath lies heavy upon me, and You have brought all Your waves upon me. You have put my acquaintances far from me; they have made me an abomination to themselves; I am shut up and cannot escape. My eye wastes away because of affliction; I have cried to You, O Lord, all the day long; I have stretched out my hands to You. Will You work wonders for the dead? Or shall physicians raise them up, that they may praise You? Shall Your mercy be declared in the grave, or Your truth in destruction? Shall Your wonders be known in the dark, and Your righteousness in the land of forgetfulness? But to You, O Lord, I have cried, and in the morning my prayer shall come before You. Why, O Lord, do You cast off my soul? Why do You hide Your face from me? I am poor and in troubles from my youth; having been exalted, I was humbled and brought low. Your fierce wrath has gone over me; Your terrors have destroyed me. They came around me like water all day long; they engulfed me altogether. You have put far from me friend and neighbor, and my acquaintances because of my afflictions."
  },
  {
    churchSlavic: "Псало́м 102: Благослови́, душе́ моя́, Го́спода, и вся вну́тренняя моя́ и́мя свято́е Его́. Благослови́, душе́ моя́, Го́спода, и не забыва́й всех воздая́ний Его́: очища́ющаго вся беззако́ния твоя́, исцеля́ющаго вся неду́ги твоя́, избавля́ющаго от истле́ния живо́т твой, венча́ющаго тя ми́лостию и щедро́тами, исполня́ющаго во благи́х жела́ние твое́; обнови́тся я́ко о́рля ю́ность твоя́. Творя́й ми́лостыни Госпо́дь и судьбу́ всем оби́димым. Сказа́ пути́ Своя́ Моисе́ови, сыново́м Изра́илевым хоте́ния Своя́. Щедр и Ми́лостив Госпо́дь, Долготерпели́в и Многоми́лостив. Не до конца́ прогне́вается, ниже́ во век вражду́ет. Не по беззако́нием на́шим сотвори́л есть нам, ниже́ по грехо́м на́шим возда́л есть нам. Я́ко по высоте́ небе́сней от земли́, утверди́л есть Госпо́дь ми́лость Свою́ на боя́щихся Его́. Ели́ко отстоя́т восто́к от за́пад, удали́л есть от нас беззако́ния на́ша. Я́коже ще́дрит оте́ц сы́ны, уще́дри Госпо́дь боя́щихся Его́. Я́ко Той позна́ созда́ние на́ше, помяну́, я́ко персть есмы́. Челове́к, я́ко трава́ дни́е его́, я́ко цвет се́льный, та́ко оцвете́т; я́ко дух про́йде в нем, и не бу́дет, и не позна́ет ктому́ ме́ста своего́. Ми́лость же Госпо́дня от ве́ка и до ве́ка на боя́щихся Его́, и пра́вда Его́ на сыне́х сыно́в, храня́щих заве́т Его́, и по́мнящих за́поведи Его́ твори́ти я. Госпо́дь на Небеси́ угото́ва Престо́л Свой, и Ца́рство Его́ все́ми облада́ет. Благослови́те Го́спода вси А́нгели Его́, си́льнии кре́постию, творя́щии сло́во Его́, услы́шати глас слове́с Его́. Благослови́те Го́спода вся Си́лы Его́, слуги́ Его́, творя́щии во́лю Его́. Благослови́те Го́спода вся дела́ Его́, на вся́ком ме́сте влады́чества Его́; благослови́, душе́ моя́, Го́спода.",
    english: "Psalm 102: Bless the Lord, O my soul, and all that is within me bless His holy Name. Bless the Lord, O my soul, and forget not all His benefits: Who forgives all your iniquities, Who heals all your diseases, Who redeems your life from corruption, Who crowns you with mercy and compassion, Who satisfies your desire with good things; your youth shall be renewed like the eagle's. The Lord performs deeds of mercy and justice for all who are wronged. He made known His ways to Moses, His desires to the children of Israel. The Lord is compassionate and merciful, slow to anger and abounding in mercy. He will not always be angry, nor will He keep His wrath forever. He has not dealt with us according to our sins, nor rewarded us according to our iniquities. For as high as the heavens are above the earth, so great is His mercy toward those who fear Him. As far as the east is from the west, so far has He removed our iniquities from us. As a father has compassion on his children, so the Lord has compassion on those who fear Him; for He knows our frame; He remembers that we are dust. As for man, his days are like grass; as a flower of the field, so he flourishes. The wind passes over it, and it is gone, and its place remembers it no more. But the mercy of the Lord is from everlasting to everlasting upon those who fear Him, and His righteousness to children's children, to those who keep His covenant and remember His commandments to do them. The Lord has prepared His throne in heaven, and His kingdom rules over all. Bless the Lord, all you His angels, mighty in strength, who do His word, heeding the voice of His word. Bless the Lord, all His hosts, His ministers who do His will. Bless the Lord, all His works, in every place of His dominion. Bless the Lord, O my soul."
  },
  {
    churchSlavic: "Псало́м 142: Го́споди, услы́ши моли́тву мою́, внуши́ моле́ние мое́ во и́стине Твое́й, услы́ши мя в пра́вде Твое́й и не вниди́ в суд с рабо́м Твои́м, я́ко не оправди́тся пред Тобо́ю всяк живы́й. Я́ко погна́ враг ду́шу мою́, смири́л есть в зе́млю живо́т мой, посади́л мя есть в те́мных, я́ко ме́ртвыя ве́ка. И уны́ во мне дух мой, во мне смяте́ся се́рдце мое́. Помяну́х дни дре́вния, поучи́хся во всех де́лех Твои́х, в творе́ниих руку́ Твое́ю поуча́хся. Воздео́х к Тебе́ ру́це мои́, душа́ моя́ я́ко земля́ безво́дная Тебе́. Ско́ро услы́ши мя, Го́споди, исчезе́ дух мой; не отврати́ лица́ Твоего́ от мене́, и уподо́блюся низходя́щим в ров. Слы́шану сотвори́ мне зау́тра ми́лость Твою́, я́ко на Тя упова́х. Скажи́ ми, Го́споди, путь, во́ньже пойду́, я́ко к Тебе́ взях ду́шу мою́. Изми́ мя от враг мои́х, Го́споди, к Тебе́ прибего́х. Научи́ мя твори́ти во́лю Твою́, я́ко Ты еси́ Бог мой. Дух Твой Благи́й наста́вит мя на зе́млю пра́ву. И́мене Твоего́ ра́ди, Го́споди, живи́ши мя; пра́вдою Твое́ю изведе́ши от печа́ли ду́шу мою́. И ми́лостию Твое́ю потреби́ши враги́ моя́ и погуби́ши вся стужа́ющыя души́ мое́й, я́ко аз раб Твой есмь.",
    english: "Psalm 142: O Lord, hear my prayer, give ear to my supplication in Your truth; hear me in Your righteousness, and enter not into judgment with Your servant, for in Your sight no one living shall be justified. For the enemy has pursued my soul; he has humbled my life to the ground; he has made me dwell in darkness like those long dead. Therefore my spirit is overwhelmed within me; my heart within me is distressed. I remember the days of old; I meditate on all Your works; I muse on the works of Your hands. I stretch out my hands to You; my soul thirsts for You like a dry land. Hear me quickly, O Lord; my spirit fails. Do not turn Your face away from me, lest I be like those who go down into the pit. Cause me to hear Your mercy in the morning, for in You do I trust. Make known to me the way in which I should walk, for I lift up my soul to You. Deliver me from my enemies, O Lord; to You I flee for refuge. Teach me to do Your will, for You are my God. Your good Spirit shall lead me on level ground. For Your Name's sake, O Lord, give me life; in Your righteousness bring my soul out of trouble. In Your mercy destroy my enemies, and cut off all those who afflict my soul, for I am Your servant."
  },
  {
    churchSlavic: "Сла́ва Отцу́ и Сы́ну и Свято́му Ду́ху, и ны́не и при́сно и во ве́ки веко́в, ами́нь.",
    english: "Glory to the Father, and to the Son, and to the Holy Spirit, now and ever and unto ages of ages. Amen."
  },
  {
    churchSlavic: "Аллилу́иа, аллилу́иа, аллилу́иа, сла́ва Тебе́ Бо́же. (3 ра́за)",
    english: "Alleluia, alleluia, alleluia, glory to You, O God. (3 times)"
  },
  {
    churchSlavic: "Бог Госпо́дь, и яви́ся нам, благослове́н Гряды́й во И́мя Госпо́дне.",
    english: "God is the Lord and He has revealed Himself to us; blessed is He who comes in the name of the Lord."
  },
  {
    churchSlavic: "Стих: Испове́дайтеся Го́сподеви, я́ко благ, я́ко в век ми́лость Его́.",
    english: "Verse: Give thanks to the Lord, for He is good, for His mercy endures forever."
  },
  {
    churchSlavic: "Бог Госпо́дь, и яви́ся нам, благослове́н Гряды́й во И́мя Госпо́дне.",
    english: "God is the Lord and He has revealed Himself to us; blessed is He who comes in the name of the Lord."
  },
  {
    churchSlavic: "Стих: Обыше́дше обыдо́ша мя, и и́менем Госпо́дним противля́хся им.",
    english: "Verse: Surrounding me they encompassed me, but in the name of the Lord I resisted them."
  },
  {
    churchSlavic: "Бог Госпо́дь, и яви́ся нам, благослове́н Гряды́й во И́мя Госпо́дне.",
    english: "God is the Lord and He has revealed Himself to us; blessed is He who comes in the name of the Lord."
  },
  {
    churchSlavic: "Стих: Не умру́, но жив бу́ду, и пове́м дела́ Госпо́дня.",
    english: "Verse: I shall not die, but live, and I shall proclaim the works of the Lord."
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
