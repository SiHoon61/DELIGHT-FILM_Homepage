import { render, screen } from "@testing-library/react";

jest.mock("../../components/Header/Header", () => () => <div>header</div>);
jest.mock("../../components/NavBar/NavBar", () => () => <div>navigation</div>);
jest.mock("../../components/CategoryAccordion/CategoryAccordion", () => () => <div>categories</div>);
jest.mock("../../components/VideoBox/VideoBox", () => ({ items }) => (
  <div data-testid="video-results">video-count:{items.length}</div>
));
jest.mock("../../components/Shorts/Shorts", () => () => <div>shorts</div>);
jest.mock("../../components/Photo/Photo", () => () => <div>photos</div>);
jest.mock("../../components/Bottom/Bottom", () => () => <div>bottom</div>);

import Works from "./Works";

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
});

test("shows a skeleton instead of fallback cards while the API is loading", () => {
  global.fetch = jest.fn(() => new Promise(() => {}));

  render(<Works />);

  expect(screen.getByRole("status")).toHaveTextContent("작품 배치를 불러오는 중입니다.");
  expect(screen.queryByTestId("video-results")).not.toBeInTheDocument();
});

test("renders the arranged cards after the API responds", async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      contents: [{
        id: "video-a",
        section: "video",
        categoryId: "film",
        category: "Film",
        youtubeVideoId: "abcdefghijk",
        title: "Example",
        subtitle: "",
      }],
      categories: {
        video: [{ id: "all", name: "All" }, { id: "film", name: "Film" }],
        shorts: [{ id: "all", name: "All" }],
      },
      layouts: {
        video: {
          all: [{
            contentId: "video-a",
            desktopPosition: 0,
            mobilePosition: 0,
            desktopColumnSpan: 2,
            desktopRowSpan: 2,
          }],
        },
        shorts: { all: [] },
      },
    }),
  });

  render(<Works />);

  expect(await screen.findByTestId("video-results")).toHaveTextContent("video-count:1");
  expect(screen.queryByRole("status")).not.toBeInTheDocument();
});
