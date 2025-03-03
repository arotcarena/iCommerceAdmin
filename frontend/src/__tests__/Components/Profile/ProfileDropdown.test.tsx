import { render } from "@testing-library/react"
import { UnitProfileDropdown } from "Components/Profile/ProfileDropdown"
import { BrowserRouter } from "react-router-dom";
import { fakeUser } from "testUtils/fakeData/entities/fakeUser";
import { User } from "type/entityTypes";


describe('ProfileDropdown', () => {
    const setUp = ({user, isLoading}: {
        user: User|null,
        isLoading: boolean
    }): HTMLElement => {

        const {container} = render(
            <BrowserRouter basename="/">
              <UnitProfileDropdown user={user} isLoading={isLoading} />
            </BrowserRouter>
        );
        return container;
    }

    it('should render correctly when loading', () => {
        const container = setUp({user: null, isLoading: true});
        expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="spinner-border-sm spinner-border"
    role="status"
    style="margin-left: 15px; opacity: 0.7;"
  >
    <span
      class="visually-hidden"
    >
      Loading...
    </span>
  </div>
</div>
`);
    })

    it('should render correctly when no user', () => {
        const container = setUp({user: null, isLoading: false});
        expect(container).toMatchInlineSnapshot(`
<div>
  <i
    class="ri-user-line ri-xl"
    style="margin-left: 15px; opacity: 0.7;"
  />
</div>
`
);
    })

    it('should render correctly when user', () => {
      const container = setUp({user: fakeUser, isLoading: false});
      expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="ms-sm-3 header-item topbar-user dropdown"
  >
    <button
      aria-expanded="false"
      aria-haspopup="true"
      class="btn"
      type="button"
    >
      <span
        class="d-flex align-items-center"
      >
        <img
          alt="Avatar de l'utilisateur"
          class="rounded-circle header-profile-user"
          src="avatar-default.jpg"
        />
        <span
          class="text-start ms-xl-2"
        >
          <span
            class="d-none d-xl-inline-block ms-1 fw-medium user-name-text"
          >
            John
          </span>
          <span
            class="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text"
          >
            Fake
          </span>
        </span>
      </span>
    </button>
    <div
      aria-hidden="true"
      class="dropdown-menu-end dropdown-menu"
      data-bs-popper="static"
      role="menu"
      tabindex="-1"
    >
      <h6
        class="dropdown-header"
      >
        Bienvenue John !
      </h6>
      <button
        class="p-0 dropdown-item"
        role="menuitem"
        tabindex="0"
      >
        <a
          class="dropdown-item"
          href="/profile"
        >
          <i
            class="mdi mdi-account-circle text-muted fs-16 align-middle me-1"
          />
          <span
            class="align-middle"
          >
            Profil
          </span>
        </a>
      </button>
      <button
        class="p-0 dropdown-item"
        role="menuitem"
        tabindex="0"
      >
        <a
          class="dropdown-item"
          href="/logout"
        >
          <i
            class="mdi mdi-logout text-muted fs-16 align-middle me-1"
          />
           
          <span
            class="align-middle"
            data-key="t-logout"
          >
            Se déconnecter
          </span>
        </a>
      </button>
    </div>
  </div>
</div>
`



















































































































































);
  })
})