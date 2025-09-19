provider "aws" {
  region = var.region
}

resource "aws_instance" "app" {
  ami           = "ami-0c55b159cbfafe1f0" # Amazon Linux 2
  instance_type = var.instance_type

  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              amazon-linux-extras install docker -y
              service docker start
              usermod -a -G docker ec2-user
              docker run -d -p 3000:3000 \
                -e DB_HOST=${aws_db_instance.users.address} \
                -e DB_USER=${var.db_user} \
                -e DB_PASSWORD=${var.db_password} \
                -e DB_NAME=${var.db_name} \
                your-dockerhub-user/users-service:latest
              EOF

  tags = {
    Name = "users-service-instance"
  }
}

resource "aws_db_instance" "users" {
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "15.3"
  instance_class       = "db.t3.micro"
  name                 = var.db_name
  username             = var.db_user
  password             = var.db_password
  skip_final_snapshot  = true
  publicly_accessible  = true
}

output "service_url" {
  value = "http://${aws_instance.app.public_ip}:3000"
}
