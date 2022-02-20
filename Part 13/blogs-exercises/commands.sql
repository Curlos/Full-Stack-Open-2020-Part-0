CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes INTEGER DEFAULT 0,
  date time
);
insert into blogs (author, url, title)
values (
    'Sam Amick',
    'https://theathletic.com/3139321/2022/02/20/is-lebrons-lakers-tenure-in-peril-plus-more-on-the-harden-simmons-saga-and-mvp-talk-all-star-weekend-revelations/',
    'Is LeBron’s Lakers tenure in peril? Plus more on the Harden-Simmons saga and MVP talk: All-Star weekend revelations'
  );
insert into blogs (url, title)
values (
    'https://theathletic.com/3139321/2022/02/20/is-lebrons-lakers-tenure-in-peril-plus-more-on-the-harden-simmons-saga-and-mvp-talk-all-star-weekend-revelations/',
    'Is LeBron’s Lakers tenure in peril? Plus more on the Harden-Simmons saga and MVP talk: All-Star weekend revelations'
  );