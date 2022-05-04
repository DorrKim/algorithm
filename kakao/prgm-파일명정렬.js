function solution(files) {
  return files
    .map((file) => file.match(/(^\D+)(\d+)(.*)/))
    .sort((fileA, fileB) => fileA[1].toUpperCase().localeCompare(fileB[1].toUpperCase()) || fileA[2] - fileB[2])
    .map((file) => file[0]);
}
