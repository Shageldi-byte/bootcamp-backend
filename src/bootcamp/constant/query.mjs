import {COURSE_TYPE} from "./constant.mjs";

export const loginQuery = `
SELECT * FROM bootcamp.users WHERE username=$1 AND password=$2 AND user_type='admin';
`;

export const webLoginQuery = `
SELECT * FROM bootcamp.users WHERE username=$1 AND password=$2 AND user_type='user';
`;

export const signUpQuery = `
INSERT INTO bootcamp.users(
fullname, username, password, phone_number, address, image, user_type, permission)
VALUES ($1, $2, $3, $4, $5,'', 'user', '-') RETURNING *;
`;

export const getProfileQuery = `
SELECT * FROM bootcamp.users WHERE id = $1 AND user_type = 'user';
`;

export const addCourseQuery = `
INSERT INTO bootcamp.course(
      name_tm, name_en, name_ru, short_desc_tm, short_desc_ru, short_desc_en, highlight_tm, highlight_ru, highlight_en, desc_tm, desc_ru, desc_en, price, image)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;
`;

export const updateCourseQuery = `
UPDATE bootcamp.course SET name_tm = $1, name_en = $2, name_ru = $3, short_desc_tm = $4, short_desc_ru = $5, short_desc_en = $6, highlight_tm = $7, highlight_ru = $8, highlight_en = $9, desc_tm = $10, desc_ru = $11, desc_en = $12, price = $13
`;

export const deleteCourseQuery = `DELETE FROM bootcamp.course WHERE id = $1`;

export const getCoursesQuery = `SELECT bc.*,
 (SELECT array_to_json(array_agg(ci.*)) FROM bootcamp.course_item ci WHERE ci.course_id = bc.id AND ci.item_type = '${COURSE_TYPE.about}') AS sections
 FROM bootcamp.course bc ORDER BY bc.created_at DESC;`;

export const getSingleCourseQuery = `SELECT bc.*
 FROM bootcamp.course bc WHERE bc.id = $1;`;

export const insertCourseItemQuery = `
INSERT INTO bootcamp.course_item (
      name_tm, name_ru, name_en, desc_tm, desc_ru, desc_en, icon, item_type, position, course_id
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *
`;

export const updateCourseItemQuery = `
  UPDATE bootcamp.course_item SET
        name_tm = $2,
        name_ru = $3,
        name_en = $4,
        desc_tm = $5,
        desc_ru = $6,
        desc_en = $7,
        item_type = $8,
        position = $9,
        course_id = $10
`;

export const deleteCourseItemQuery = `
DELETE FROM bootcamp.course_item WHERE id = $1 RETURNING *;
`;

export const getCourseItemQuery = `
SELECT * FROM bootcamp.course_item WHERE item_type=$1 AND course_id=$2 ORDER BY "position" ASC, created_at DESC;
`;

export const getCourseReviews = `
SELECT * FROM bootcamp.review WHERE course_id=$1 ORDER BY created_at DESC;
`;

export const addVideoCourseQuery = `
INSERT INTO bootcamp.video_course(title_tm, title_ru, title_en, image, desc_tm, desc_en, desc_ru) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
`;

export const updateVideoCourseQuery = `
UPDATE bootcamp.video_course SET title_tm = $2, title_ru = $3, title_en = $4, desc_tm = $5, desc_en = $6, desc_ru = $7
`;

export const deleteVideoCourseQuery=`
DELETE FROM bootcamp.video_course WHERE id=$1;
`;

export const getVideoCourseQuery = `
SELECT vc.*,
(SELECT array_to_json(array_agg(vi.*)) FROM bootcamp.video_item vi WHERE vi.video_course_id=vc.id) AS videos
FROM bootcamp.video_course vc ORDER BY created_at DESC;
`;

export const insertVideoCourseItemQuery = `
INSERT INTO bootcamp.video_item(title_tm, title_ru, title_en, creator, video_url, desc_tm, desc_ru, desc_en, sources, views, video_course_id, position) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 0, $10, $11) RETURNING *;
`;

export const updateVideoCourseItemQuery = `
UPDATE bootcamp.video_item SET
      title_tm=$1, title_ru=$2, title_en=$3, creator=$4, video_url=$5, desc_tm=$6, desc_ru=$7, desc_en=$8, sources=$9, video_course_id=$10, position=$11
      WHERE id=$12 RETURNING *;
`;
export const updateVideoCourseItemQuery2 = `
UPDATE bootcamp.video_item SET
      title_tm=$1, title_ru=$2, title_en=$3, creator=$4, desc_tm=$5, desc_ru=$6, desc_en=$7, sources=$8, video_course_id=$9, position=$10
      WHERE id=$11 RETURNING *;`;

export const getVideoItemByCourseIdQuery = `
SELECT * FROM bootcamp.video_item WHERE video_course_id=$1;
`;

