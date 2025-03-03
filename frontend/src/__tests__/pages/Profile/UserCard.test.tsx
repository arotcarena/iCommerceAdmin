import { render } from "@testing-library/react"
import { UserCard } from "pages/Profile/UserCard"
import { fakeUser } from "testUtils/fakeData/entities/fakeUser"

describe('UserCard', () => {
    it('should render correctly', () => {
        const {container} = render(<UserCard user={fakeUser} />);

        expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="w-100 card"
    style="min-height: 117px;"
  >
    <div
      class="card-body"
    >
      <div
        class="d-flex"
      >
        <div
          class="mx-3"
        >
          <img
            alt="user_avatar"
            class="avatar-md rounded-circle img-thumbnail"
            src="avatar-default.jpg"
          />
        </div>
        <div
          class="flex-grow-1 align-self-center"
        >
          <div
            class="text-muted"
          >
            <h5>
              John
               
              Fake
            </h5>
            <div
              data-testid="user"
            >
              johnfake@mail.com
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`);
    })
})