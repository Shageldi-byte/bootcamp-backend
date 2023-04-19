import { IMAGE_BASE_URL } from "../../core/constant.mjs";

export const getAllStoriesQuery = `
    SELECT *,'${IMAGE_BASE_URL}/public/story/' || image AS image FROM sepgit.story ORDER BY created_at DESC;
`;

export const getOldStory = `
    SELECT * FROM sepgit.story WHERE id=$1 ORDER BY created_at DESC;
`;

export const addStoryQuery = `
INSERT INTO sepgit.story(
	fullname, organzation, image, text_tm, text_ru, text_en)
	VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
`;

export const updateStoryQuery = `
UPDATE sepgit.story
	SET fullname=$1, organzation=$2, image=$3, text_tm=$4, text_ru=$5, text_en=$6, updated_at='now()'
	WHERE id = $7 RETURNING *;
`;

export const deletStoryQuery = `
DELETE FROM sepgit.story
	WHERE id=$1;
`;

export const getMediaQuery = `
SELECT *,
'${IMAGE_BASE_URL}/public/media/' || image AS image,
'${IMAGE_BASE_URL}/public/media/' || file_name AS file_name 
FROM sepgit.media WHERE type=$1 ORDER BY created_at DESC;
`;

export const getMediaById=`
SELECT * FROM sepgit.media WHERE id=$1 ORDER BY created_at DESC;
`;

export const addMediaQuery = `
INSERT INTO sepgit.media(
	name, surname, job, image, topic_tm, topic_en, topic_ru, language, file_name, duration, type)
	VALUES ($1, $2, $3,$4,$5,$6, $7, $8, $9, $10, $11) RETURNING *;
`;

export const updateMediaQuery = `
UPDATE sepgit.media
	SET name=$1, surname=$2, job=$3, image=$4, topic_tm=$5, topic_en=$6, topic_ru=$7, language=$8, file_name=$9, type=$10, updated_at='now()', duration=$11
	WHERE id=$12 RETURNING *;
`;

export const deleteMediaQuery = `
DELETE FROM sepgit.media
	WHERE id=$1;
`;

export const getBilboardQuery = `
SELECT *,
'${IMAGE_BASE_URL}/public/bilboard/' || image_tm AS image_tm, 
'${IMAGE_BASE_URL}/public/bilboard/' || image_ru AS image_ru, 
'${IMAGE_BASE_URL}/public/bilboard/' || image_en AS image_en
FROM sepgit.bilboard ORDER BY "position" ASC, created_at DESC;
`;

export const getBilboardById = `
SELECT * FROM sepgit.bilboard WHERE id = $1;
`;

export const addBilboardQuery = `
INSERT INTO sepgit.bilboard(
	image_tm, image_en, image_ru, content_tm, content_ru, content_en, "position")
	VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
`;

export const updateBilboardQuery = `
UPDATE sepgit.bilboard
	SET image_tm=$1, image_en=$2, image_ru=$3, content_tm=$4, content_ru=$5, content_en=$6, "position"=$7,  updated_at='now()'
	WHERE id=$8 RETURNING *;
`;

export const deleteBilboardQuery = `
DELETE FROM sepgit.bilboard
	WHERE id=$1;
`;

export const searchStoryQuery = `
	SELECT *,'${IMAGE_BASE_URL}/public/story/' || image AS image
	FROM sepgit.story WHERE
	fullname ILIKE '%' || $1 || '%' OR 
	organzation ILIKE '%' || $1 || '%' OR 
	text_tm ILIKE '%' || $1 || '%' OR 
	text_ru ILIKE '%' || $1 || '%' OR 
	text_en ILIKE '%' || $1 || '%';
`;

export const searchMediaQuery = `
SELECT *,
'${IMAGE_BASE_URL}/public/media/' || image AS image,
'${IMAGE_BASE_URL}/public/media/' || file_name AS file_name  
FROM sepgit.media WHERE
name ILIKE '%' || $1 || '%'
OR surname ILIKE '%' || $1 || '%'
OR job ILIKE '%' || $1 || '%'
OR topic_tm ILIKE '%' || $1 || '%'
OR topic_ru ILIKE '%' || $1 || '%'
OR topic_en ILIKE '%' || $1 || '%';
`;

export const searchBilboardQuery = `
SELECT *,
'${IMAGE_BASE_URL}/public/bilboard/' || image_tm AS image_tm, 
'${IMAGE_BASE_URL}/public/bilboard/' || image_ru AS image_ru, 
'${IMAGE_BASE_URL}/public/bilboard/' || image_en AS image_en 
FROM sepgit.bilboard WHERE 
content_en ILIKE '%' || $1 || '%'
OR content_ru ILIKE '%' || $1 || '%'
OR content_tm ILIKE '%' || $1 || '%';
`;


