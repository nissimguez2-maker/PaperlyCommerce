-- Paperly — catalog seed. Mirrors src/data/catalog.ts (the canonical source).
-- Run after schema.sql. Idempotent (upserts on primary keys).

-- Collections -----------------------------------------------------------------
insert into collections (id, slug, name_en, name_he, tagline_en, tagline_he, description_en, description_he, position) values
('complete-sets','complete-sets','Complete Sets','סטים שלמים',
 'One coherent world, in a single piece.','עולם אחד שלם, ביצירה אחת.',
 'Curated sets that dress an entire table in one visual language — the simplest way to bring the studio to your evening.',
 'סטים אצורים שמלבישים שולחן שלם בשפה ויזואלית אחת — הדרך הפשוטה ביותר להביא את הסטודיו לערב שלך.',0),
('pieces','pieces','Pieces','פריטים',
 'Individual pieces, designed by the studio.','פריטים בודדים, בעיצוב הסטודיו.',
 'Single pieces from the collection, each art-directed and made in studio on premium stock.',
 'פריטים בודדים מהקולקציה, כל אחד בניהול אמנותי ומיוצר בסטודיו על נייר איכותי.',1)
on conflict (id) do update set
  name_en=excluded.name_en, name_he=excluded.name_he,
  tagline_en=excluded.tagline_en, tagline_he=excluded.tagline_he,
  description_en=excluded.description_en, description_he=excluded.description_he,
  position=excluded.position;

-- Products --------------------------------------------------------------------
insert into products (slug, collection_id, name_en, name_he, tagline_en, tagline_he,
  description_en, description_he, dimensions_en, dimensions_he, image_alt_en, image_alt_he,
  included_en, included_he, images, option_groups, cross_sell, favourite, premium_anchor, position) values

('the-full-universe','complete-sets','The Full Universe','היקום המלא',
 'A complete printed world for your evening.','עולם שלם ומודפס לערב שלך.',
 'The studio''s most complete set. One hundred menus, one hundred place cards and a full signage suite, art-directed end to end so every surface of the evening speaks the same language.',
 'הסט המקיף ביותר של הסטודיו. מאה תפריטים, מאה כרטיסי מקום וסוויטת שילוט מלאה — בניהול אמנותי מקצה לקצה, כך שכל פינה בערב מדברת באותה שפה.',
 'Menus A5 · place cards 90 mm · signage large-format','תפריטים A5 · כרטיסי מקום 90 מ״מ · שילוט בפורמט גדול',
 'The Full Universe — a complete suite of wedding menus, place cards and signage designed by Paperly',
 'היקום המלא — סוויטה שלמה של תפריטים, כרטיסי מקום ושילוט לחתונה בעיצוב Paperly',
 '[]'::jsonb,'[]'::jsonb,'[]'::jsonb,'[]'::jsonb,'["the-setting","menu"]'::jsonb,true,true,0),

('the-setting','complete-sets','The Setting','הסידור',
 'From the entrance to the table, one language.','מהכניסה ועד השולחן, שפה אחת.',
 'Everything in The Table, plus a welcome sign that sets the tone the moment your guests arrive — a single visual language from entrance to seat.',
 'כל מה שיש בשולחן, בתוספת שלט קבלת פנים שמכתיב את הנימה כבר ברגע שהאורחים מגיעים — שפה ויזואלית אחת מהכניסה ועד הכיסא.',
 'Menus A5 · place cards 90 mm · welcome sign 50 × 70 cm','תפריטים A5 · כרטיסי מקום 90 מ״מ · שלט קבלת פנים 50 × 70 ס״מ',
 'The Setting — wedding menus, place cards and a welcome sign designed by Paperly',
 'הסידור — תפריטים, כרטיסי מקום ושלט קבלת פנים לחתונה בעיצוב Paperly',
 '[]'::jsonb,'[]'::jsonb,'[]'::jsonb,'[]'::jsonb,'["the-full-universe","the-table"]'::jsonb,false,false,1),

('the-table','complete-sets','The Table','השולחן',
 'Menus and place cards, one coherent set.','תפריטים וכרטיסי מקום, סט אחד קוהרנטי.',
 'Fifty menus and fifty place cards, art-directed as one. The cleanest way to give every seat at the table a sense of intention.',
 'חמישים תפריטים וחמישים כרטיסי מקום, בניהול אמנותי כמקשה אחת. הדרך הנקייה ביותר להעניק לכל מושב בשולחן תחושת כוונה.',
 'Menus A5 · place cards 90 mm','תפריטים A5 · כרטיסי מקום 90 מ״מ',
 'The Table — a coordinated set of wedding menus and place cards designed by Paperly',
 'השולחן — סט מתואם של תפריטים וכרטיסי מקום לחתונה בעיצוב Paperly',
 '[]'::jsonb,'[]'::jsonb,'[]'::jsonb,'[]'::jsonb,'["the-setting","place-card"]'::jsonb,false,false,2),

('menu','pieces','Menu','תפריט',
 'The piece every guest holds.','הפריט שכל אורח מחזיק.',
 'A menu carries the tone of the whole evening in the hand. Art-directed composition, considered typography and a palette set by the studio, made in studio on premium stock.',
 'תפריט נושא בכף היד את הנימה של הערב כולו. קומפוזיציה בניהול אמנותי, טיפוגרפיה מדודה ופלטה שנקבעת על ידי הסטודיו, מיוצר בסטודיו על נייר איכותי.',
 'A5 portrait · 148 × 210 mm','A5 לאורך · 148 × 210 מ״מ',
 'Editorial wedding menu designed by Paperly on premium stock',
 'תפריט חתונה אדיטוריאלי בעיצוב Paperly על נייר איכותי',
 '[]'::jsonb,'[]'::jsonb,'[]'::jsonb,
 '[{"key":"pack","label":{"en":"Set size","he":"גודל הסט"}}]'::jsonb,
 '["place-card","the-table"]'::jsonb,true,false,3),

('place-card','pieces','Place Card','כרטיס מקום',
 'A name, placed with intention.','שם, ממוקם בכוונה.',
 'The small gesture that tells each guest they were expected. Choose folded or round, art-directed to sit in quiet harmony with the rest of the table.',
 'המחווה הקטנה שמספרת לכל אורח שחיכו לו. בחירה בין מקופל לעגול, בניהול אמנותי שמשתלב בהרמוניה שקטה עם שאר השולחן.',
 'Folded 90 × 90 mm · Round 90 mm ⌀','מקופל 90 × 90 מ״מ · עגול 90 מ״מ קוטר',
 'Round and folded wedding place cards designed by Paperly',
 'כרטיסי מקום עגולים ומקופלים לחתונה בעיצוב Paperly',
 '[]'::jsonb,'[]'::jsonb,'[]'::jsonb,
 '[{"key":"format","label":{"en":"Format","he":"פורמט"}},{"key":"pack","label":{"en":"Set size","he":"גודל הסט"}}]'::jsonb,
 '["menu","the-table"]'::jsonb,false,false,4)
on conflict (slug) do update set
  collection_id=excluded.collection_id, name_en=excluded.name_en, name_he=excluded.name_he,
  tagline_en=excluded.tagline_en, tagline_he=excluded.tagline_he,
  description_en=excluded.description_en, description_he=excluded.description_he,
  favourite=excluded.favourite, premium_anchor=excluded.premium_anchor, position=excluded.position;

-- Variants --------------------------------------------------------------------
insert into product_variants (id, product_slug, label_en, label_he, options, price, position) values
('full-universe','the-full-universe','The Full Universe','היקום המלא','{}'::jsonb,1200,0),
('setting','the-setting','The Setting','הסידור','{}'::jsonb,850,0),
('table','the-table','The Table','השולחן','{}'::jsonb,590,0),
('menu-25','menu','Set of 25','סט של 25','{"pack":"25"}'::jsonb,220,0),
('menu-50','menu','Set of 50','סט של 50','{"pack":"50"}'::jsonb,390,1),
('menu-100','menu','Set of 100','סט של 100','{"pack":"100"}'::jsonb,690,2),
('place-folded-50','place-card','Folded · Set of 50','מקופל · סט של 50','{"format":"folded","pack":"50"}'::jsonb,260,0),
('place-folded-100','place-card','Folded · Set of 100','מקופל · סט של 100','{"format":"folded","pack":"100"}'::jsonb,460,1),
('place-round-50','place-card','Round · Set of 50','עגול · סט של 50','{"format":"round","pack":"50"}'::jsonb,260,2),
('place-round-100','place-card','Round · Set of 100','עגול · סט של 100','{"format":"round","pack":"100"}'::jsonb,460,3)
on conflict (id) do update set
  product_slug=excluded.product_slug, label_en=excluded.label_en, label_he=excluded.label_he,
  options=excluded.options, price=excluded.price, position=excluded.position;
