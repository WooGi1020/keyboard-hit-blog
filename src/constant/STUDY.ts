// 스터디 글은 홈 목록과 태그 탭에 섞지 않고 /study 에서만 모아 보여준다.
export const STUDY_TAG = "Study";
export const STUDY_PATH = "/study";

export function isStudyPost(post: { tags: string[] }) {
  return post.tags.includes(STUDY_TAG);
}
