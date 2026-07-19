-- A coller dans Supabase : menu de gauche -> "SQL Editor" -> "New query" -> Run

create table if not exists series (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  country text not null,
  year int,
  synopsis text,
  video_url text,
  added_at bigint default (extract(epoch from now()) * 1000)::bigint
);

alter table series enable row level security;

create policy "Lecture publique" on series
  for select using (true);

create policy "Ajout reserve aux connectes" on series
  for insert to authenticated with check (true);

create policy "Suppression reservee aux connectes" on series
  for delete to authenticated using (true);

insert into series (title, country, year, synopsis, video_url, added_at) values
($$Vengeance$$, $$CM$$, 2022, $$La vie d'une famille riche et puissante est bouleversee par l'apparition d'un mysterieux assassin qui cherche a eteindre sa lignee.$$, $$https://www.youtube.com/watch?v=wzQaRkQYWOU$$, 1),
($$Pouvoir et Loi$$, $$CM$$, 2022, $$Une avocate reprend le cabinet de son pere, un tenor du barreau, sans se douter qu'il trempe lui-meme dans de sombres affaires.$$, $$https://www.youtube.com/watch?v=8LyIsDQTnlc$$, 2),
($$Ewusu$$, $$CM$$, 2024, $$Une jeune psychologue de Yaounde se confronte a des cas hors du commun dans son cabinet d'un quartier populaire.$$, $$https://www.youtube.com/watch?v=UWeiHfHIZUc$$, 3),
($$Baabel$$, $$SN$$, 2023, $$Quatre belles-soeurs s'affrontent sans merci pour devenir la reine incontestee de la famille.$$, $$https://www.youtube.com/watch?v=KSv4tJkR0pk$$, 4),
($$Lady Diama$$, $$SN$$, 2024, $$Le portrait de Diama Kane, consideree comme la plus belle femme du Senegal, prise dans une relation compliquee.$$, $$https://www.youtube.com/watch?v=fZRzc35Qdok$$, 5),
($$Tukki$$, $$SN$$, 2025, $$Trois ans apres un coup rate a Casablanca, deux anciens arnaqueurs reviennent fauches a Dakar pour un dernier plan.$$, $$https://www.youtube.com/watch?v=-jAM8u1RETI$$, 6),
($$Isabelle$$, $$CI$$, 2023, $$Le quotidien d'une jeune fille d'Abidjan passionnee par les reseaux sociaux.$$, $$https://www.youtube.com/watch?v=ceN23rHrUCg$$, 7),
($$Niabla$$, $$CI$$, 2023, $$Une jeune femme debarque a Abidjan pour retrouver sa soeur, plongeant dans les nuits troubles de la ville.$$, $$$$, 8),
($$Les Perles de Babi$$, $$CI$$, 2024, $$Les destins croises de six jeunes femmes d'Abidjan qui cherchent a s'affirmer entre tradition et modernite.$$, $$$$, 9),
($$Les Nounous$$, $$CI$$, 2024, $$Le quotidien de six employees de maison au caractere bien trempe dans une cite bourgeoise d'Abidjan.$$, $$$$, 10),
($$Chez Coco$$, $$CD$$, 2023, $$Sitcom kinoise centree sur un salon de coiffure et sa nouvelle patronne, Coco.$$, $$https://www.youtube.com/playlist?list=PLk_JVM79nFVIsVLj_z1Fhs233InXi7kWF$$, 11),
($$Sens Interdit$$, $$CD$$, 2023, $$Deux familles fortunees de Kinshasa tentent de sceller leur union par un mariage arrange qui ne se passe pas comme prevu.$$, $$$$, 12),
($$Verita$$, $$CD$$, 2024, $$Une serie chorale melant drame, comedie et romance autour de l'importance de dire la verite.$$, $$$$, 13),
($$Dimanche a Bamako$$, $$ML$$, 2022, $$Trois femmes que tout oppose se retrouvent chez le meme marabout a quelques heures de leur mariage.$$, $$$$, 14),
($$Apparences$$, $$BJ$$, 2024, $$La famille Oni se dechire dans une lutte de succession a la tete de son empire apres l'assassinat du patriarche.$$, $$$$, 15),
($$Cotonou$$, $$BJ$$, 2023, $$Une immersion dans les quartiers et la jeunesse de la megapole beninoise de Cotonou.$$, $$$$, 16),
($$Windeck$$, $$AO$$, 2012, $$La riche famille Voss, proprietaire du magazine de mode Divo a Luanda, attire toutes les convoitises et les intrigues amoureuses.$$, $$https://www.youtube.com/watch?v=6m5nahL8WTg$$, 17),
($$Madame... Monsieur$$, $$CM$$, 2019, $$Une comedie camerounaise sur les hauts et les bas du quotidien d'un couple.$$, $$https://www.youtube.com/watch?v=8SsYIQZAZv0$$, 18),
($$Foyer Polygamique$$, $$CM$$, 2023, $$Trois familles voisines et leurs histoires rocambolesques, entre jalousie et rebondissements, dans un foyer polygame.$$, $$https://www.youtube.com/watch?v=lXycjN3glOY$$, 19),
($$Sketchs de Gaby Kmer$$, $$CM$$, 2022, $$Sketchs comiques camerounais sur les petits travers du quotidien, portes par l'humoriste Gaby Kmer.$$, $$https://www.youtube.com/watch?v=CQR-hQk0BFE$$, 20),
($$Sketchs d'Ulrich Takam$$, $$CM$$, 2025, $$Web-series et sketchs de l'humoriste camerounais Ulrich Takam sur la vie quotidienne de la jeunesse.$$, $$https://www.youtube.com/watch?v=rwYUCY0xrHI$$, 21),
($$Moustique le Charismatique et compagnie$$, $$CM$$, 2019, $$Prestations et sketchs de l'humoriste camerounais Moustique le Charismatique.$$, $$https://www.youtube.com/watch?v=LKi7jWKADPA$$, 22);
