/*Script for seeding the db*/

TRUNCATE TABLE users, posts, comments RESTART IDENTITY CASCADE;

INSERT INTO users (username, password, user_type)
VALUES
    ('nour_admin', '', 1), -- Admim
    ('omar_gaza',  '', 0), -- Normal
    ('sara_refugee', '', 0); -- Normal

INSERT INTO posts (u_id, title, text)
VALUES
    (
        (SELECT u_id FROM users WHERE username = 'nour_admin'),
        'Current Situation in Northern Gaza',
        'Updates regarding recent humanitarian aid arrivals and medical supplies.'
    ),
    (
        (SELECT u_id FROM users WHERE username = 'omar_gaza'),
        'Daily Life Under Blockade',
        'A personal account of how our local community is organizing water distribution.'
    );

INSERT INTO comments (p_id, u_id, text)
VALUES
    (
        (SELECT p_id FROM posts WHERE title = 'Current Situation in Northern Gaza'),
        (SELECT u_id FROM users WHERE username = 'sara_refugee'),
        'Thank you for the update. Where can we find the distribution points?'
    ),
    (
        (SELECT p_id FROM posts WHERE title = 'Daily Life Under Blockade'),
        (SELECT u_id FROM users WHERE username = 'nour_admin'),
        'Stay safe, Omar. We are documenting these community efforts for the report.'
    );



