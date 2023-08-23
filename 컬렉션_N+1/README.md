## Description

- x To Many 에 대한 N + 1 처리 테스트

## Relations

- User 엔티티는 많은 Photo 엔티티를 가질 수 있다. (one to many)

## Conditions

- 페이지네이션 처리 존재

## relations 옵션을 활용했을 경우

- 페이지네이션이 없을 경우 `photos` 를 `left join` 으로 통으로 가져옴
```sql
SELECT `User`.`id`                     AS `User_id`,
     `User`.`userName`                 AS `User_userName`,
     `User__User_photos`.`id`          AS `User__User_photos_id`,
     `User__User_photos`.`name`        AS `User__User_photos_name`,
     `User__User_photos`.`description` AS `User__User_photos_description`,
     `User__User_photos`.`filename`    AS `User__User_photos_filename`,
     `User__User_photos`.`views`       AS `User__User_photos_views`,
     `User__User_photos`.`isPublished` AS `User__User_photos_isPublished`,
     `User__User_photos`.`userId`      AS `User__User_photos_userId`
FROM `user` `User`
    LEFT JOIN `photo` `User__User_photos` ON `User__User_photos`.`userId` = `User`.`id`
```

- 페이지네이션이 있을 경우 위 쿼리의 userId를 distinct 하여 페이지네이션을 처리한 userId들을 가져오고 그 후 다시 userId들을 활용하여 조회한다.
```sql
SELECT DISTINCT `distinctAlias`.`User_id` AS `ids_User_id`
FROM (SELECT `User`.`id`                       AS `User_id`,
             `User`.`userName`                 AS `User_userName`,
             `User__User_photos`.`id`          AS `User__User_photos_id`,
             `User__User_photos`.`name`        AS `User__User_photos_name`,
             `User__User_photos`.`description` AS `User__User_photos_description`,
             `User__User_photos`.`filename`    AS `User__User_photos_filename`,
             `User__User_photos`.`views`       AS `User__User_photos_views`,
             `User__User_photos`.`isPublished` AS `User__User_photos_isPublished`,
             `User__User_photos`.`userId`      AS `User__User_photos_userId`
      FROM `user` `User`
               LEFT JOIN `photo` `User__User_photos` ON `User__User_photos`.`userId` = `User`.`id`) `distinctAlias`
ORDER BY `User_id` ASC
LIMIT 2 OFFSET 1

SELECT `User`.`id`                       AS `User_id`,
       `User`.`userName`                 AS `User_userName`,
       `User__User_photos`.`id`          AS `User__User_photos_id`,
       `User__User_photos`.`name`        AS `User__User_photos_name`,
       `User__User_photos`.`description` AS `User__User_photos_description`,
       `User__User_photos`.`filename`    AS `User__User_photos_filename`,
       `User__User_photos`.`views`       AS `User__User_photos_views`,
       `User__User_photos`.`isPublished` AS `User__User_photos_isPublished`,
       `User__User_photos`.`userId`      AS `User__User_photos_userId`
FROM `user` `User`
         LEFT JOIN `photo` `User__User_photos` ON `User__User_photos`.`userId` = `User`.`id`
WHERE `User`.`id` IN (2, 3)
```