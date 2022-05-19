function solution(word, pages) {
  const pageInfos = pages.map((page) => {
    const [url] = page.match(/(?<=<meta property="og:url" content="https:\/\/).+(?="\/>)/);
    const searchWordRegExp = new RegExp(`(?<=[^a-zA-Z])${word}(?=[^a-zA-Z])`, 'gi');

    const matchedPage = page.match(searchWordRegExp);
    const defaultScore = matchedPage?.length ?? 0;
    const outerLinks = page.match(/(?<=<a href="https:\/\/)+(?=\")/gm);

    return {
      url,
      defaultScore,
      outerLinks
    };
  });

  const matchingScores = pageInfos.map(({ url, defaultScore }, index, self) => {
    const outerPageReferCurrentPage = self.filter(({ outerLinks }) => outerLinks.includes(url));
    const linkScore = outerPageReferCurrentPage.reduce(
      (accLinkScore, { defaultScore, outerLinks }) => accLinkScore + defaultScore / outerLinks.length,
      0
    );

    return [defaultScore, linkScore];
  });

  return matchingScores;
}

solution('blind', [
  '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://a.com"/>\n</head>  \n<body>\nBlind Lorem Blind ipsum dolor Blind test sit amet, consectetur adipiscing elit. \n<a href="https://b.com"> Link to b </a>\n</body>\n</html>',
  '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://b.com"/>\n</head>  \n<body>\nSuspendisse potenti. Vivamus venenatis tellus non turpis bibendum, \n<a href="https://a.com"> Link to a </a>\nblind sed congue urna varius. Suspendisse feugiat nisl ligula, quis malesuada felis hendrerit ut.\n<a href="https://c.com"> Link to c </a>\n</body>\n</html>',
  '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://c.com"/>\n</head>  \n<body>\nUt condimentum urna at felis sodales rutrum. Sed dapibus cursus diam, non interdum nulla tempor nec. Phasellus rutrum enim at orci consectetu blind\n<a href="https://a.com"> Link to a </a>\n</body>\n</html>'
]);
