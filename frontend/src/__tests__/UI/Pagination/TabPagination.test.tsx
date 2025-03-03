import { render } from "@testing-library/react"
import { TabPagination } from "UI/Pagination/TabPagination"

describe('TabPagination', () => {
    const setUp = (
        itemsPerPage: number,
        countShowingItems: number,
        totalItems: number,
        page: number,
        onChange: (page: number) => void
    ): HTMLElement => {
        const {container} = render(
            <TabPagination
                itemsPerPage={itemsPerPage}
                countShowingItems={countShowingItems}
                totalItems={totalItems}
                page={page}
                onChange={onChange}
            />
        )

        return container;
    };

    it('should render correctly', () => {
        const container = setUp(10, 10, 30, 2, (page: number) => {});

        expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="align-items-center mt-2 g-3 text-center text-sm-start card-body ms-4 me-4 row"
  >
    <div
      class="col-sm"
    >
      <div
        class="text-muted"
      >
        showing_results
      </div>
    </div>
    <div
      class="col-sm-auto"
    >
      <ul
        class="pagination pagination-separated pagination-md justify-content-center justify-content-sm-start mb-0"
      >
        <li
          class="page-item"
        >
          <button
            class="page-link"
            type="button"
          >
            previous
          </button>
        </li>
        <li
          class="page-item"
        >
          <button
            class="page-link"
            type="button"
          >
            1
          </button>
        </li>
        <li
          class="page-item"
        >
          <button
            class="page-link active"
            type="button"
          >
            2
          </button>
        </li>
        <li
          class="page-item"
        >
          <button
            class="page-link"
            type="button"
          >
            3
          </button>
        </li>
        <li
          class="page-item"
        >
          <button
            class="page-link"
            type="button"
          >
            next
          </button>
        </li>
      </ul>
    </div>
  </div>
</div>
`);
    })
})