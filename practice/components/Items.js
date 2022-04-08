import { Grid, Image } from "semantic-ui-react";

export default function Items({ items }) {
  return (
    <div>
      <Grid columns={3} divided>
        <Grid.Row>
          {items?.map((item) => (
            <Grid.Column key={item.id}>
              <Image
                src={item.image_link}
                alt={item.name}
                width={100}
                height={100}
              />
              {item.name}
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </div>
  );
}
