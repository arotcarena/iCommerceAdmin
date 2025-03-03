import { render, screen } from "@testing-library/react"
import { BreadCrumb } from "UI/Common/BreadCrumb"
import { MemoryRouter } from "react-router-dom";
import { BreadcrumbItem } from "type/mainTypes"

describe('BreadCrumb', () => {
    const setUp = (
        title: string,
        breadcrumbItems?: BreadcrumbItem[],
        hasHomeItem: boolean = true
    ) => {
        const {container} = render(
            <MemoryRouter basename="/">
                <BreadCrumb 
                    title={title}
                    breadcrumbItems={breadcrumbItems}
                    hasHomeItem={hasHomeItem}
                />
            </MemoryRouter>
        );

        return container;
    };

    it('should render correctly breadcrumb item link when link is passed', () => {
        setUp('title', [
            { link: '/link', label: 'label' }
        ]);
        expect(screen.getByText('label')).toHaveAttribute('href', '/link');
    })

    it('should render correctly breadcrumb item link when route is passed', () => {
        setUp('title', [
            { route: 'home', label: 'label' }
        ]);
        expect(screen.getByText('label')).toHaveAttribute('href', '/');
    })

    it('should render correctly when hasHomeItem is false', () => {
        const container = setUp('test_title', [], false);
        
        expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="ms-0 me-0 row"
  >
    <div
      class="col-12"
    >
      <div
        class="page-title-box d-sm-flex align-items-center justify-content-between"
        style="flex-direction: row-reverse;"
      >
        <h4
          class="mb-sm-0"
        >
          test_title
        </h4>
        <div
          class="page-title-right"
        >
          <ol
            class="breadcrumb m-0"
          >
            <li
              class="breadcrumb-item active"
            >
              test_title
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</div>
`);
    })

    it('should render correctly', () => {
        const container = setUp('title', [
            {link: '/link', label: 'label'}
        ]);

        expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="ms-0 me-0 row"
  >
    <div
      class="col-12"
    >
      <div
        class="page-title-box d-sm-flex align-items-center justify-content-between"
        style="flex-direction: row-reverse;"
      >
        <h4
          class="mb-sm-0"
        >
          title
        </h4>
        <div
          class="page-title-right"
        >
          <ol
            class="breadcrumb m-0"
          >
            <li
              class="breadcrumb-item"
            >
              <a
                href="/"
              >
                dashboard
              </a>
            </li>
            <li
              class="breadcrumb-item"
            >
              <a
                href="/link"
              >
                label
              </a>
            </li>
            <li
              class="breadcrumb-item active"
            >
              title
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</div>
`);
    })
})