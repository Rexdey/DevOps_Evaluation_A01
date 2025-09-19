output "ec2_public_ip" {
  value = aws_instance.app.public_ip
}

output "service_url" {
  value = "http://${aws_instance.app.public_ip}:3000"
}
